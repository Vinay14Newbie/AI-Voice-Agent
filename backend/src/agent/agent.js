// this file defines the main agent logic. It uses the OpenAI API to generate responses based on user input and the defined tools. The agent can call tools to perform specific actions, and then use the results of those tools to generate a final response for the user. The agent is designed to handle conversations related to booking and managing doctor appointments.

import OpenAI from "openai";
import { tools } from "./tools.js";
import { executeTool } from "./executor.js";
import { OPENAI_API_KEY } from "../config/serverConfig.js";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export async function runAgent(userMessage) {
  let messages = [
    {
      role: "system",
      content:
        "You are a helpful medical assistant that books and manages doctor appointments.",
    },
    {
      role: "user",
      content: userMessage,
    },
  ];

  // First model response
  const response = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages,
    tools,
  });

  const message = response.choices[0].message;

  // Check if the model wants to call a tool
  if (message.tool_calls) {
    const toolCall = message.tool_calls[0];

    const toolName = toolCall.function.name;

    const args = JSON.parse(toolCall.function.arguments);

    // Execute backend function
    const result = await executeTool(toolName, args);

    // Add tool response to conversation
    messages.push(message);

    messages.push({
      role: "tool",
      tool_call_id: toolCall.id,
      content: JSON.stringify(result),
    });

    // Second model response (final answer)
    const finalResponse = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages,
    });

    return finalResponse.choices[0].message.content;
  }

  return message.content;
}
