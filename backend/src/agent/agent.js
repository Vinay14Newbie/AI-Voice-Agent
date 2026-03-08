// This file defines the main logic for the AI agent that manages doctor appointments. The runAgent function takes a user message and a session ID as input, retrieves the conversation history for that session, and interacts with the OpenAI API to generate responses. If the response includes tool calls, it executes the specified tools and incorporates their results into the conversation before generating a final response. The conversation history is saved back to the memory service after each interaction to maintain context for future messages in the same session.

import OpenAI from "openai";
import { tools } from "./tools.js";
import { executeTool } from "./executor.js";
import { OPENAI_API_KEY } from "../config/serverConfig.js";
import {
  getConversationService,
  saveConversationService,
} from "../services/memoryService.js";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export async function runAgent(userMessage, sessionId) {
  let messages = await getConversationService(sessionId);

  if (messages.length === 0) {
    messages.push({
      role: "system",
      content: "You are a helpful assistant that manages doctor appointments.",
    });
  }

  messages.push({
    role: "user",
    content: userMessage,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages,
    tools,
  });

  const message = response.choices[0].message;

  if (message.tool_calls) {
    const toolCall = message.tool_calls[0];

    const toolName = toolCall.function.name;

    const args = JSON.parse(toolCall.function.arguments);

    const result = await executeTool(toolName, args);

    messages.push(message);

    messages.push({
      role: "tool",
      tool_call_id: toolCall.id,
      content: JSON.stringify(result),
    });

    const finalResponse = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages,
    });

    const reply = finalResponse.choices[0].message;

    messages.push(reply);

    await saveConversationService(sessionId, messages);

    return reply.content;
  }

  messages.push(message);

  await saveConversationService(sessionId, messages);

  return message.content;
}
