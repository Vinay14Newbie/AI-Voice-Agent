// this communicates with api from openai to run the agent and get responses based on user input. It defines a function runAgent that takes a user message as input, sends it to the OpenAI API along with the defined tools, and returns the response from the API. The system message sets the context for the agent, telling it that it is a hospital assistant that helps patients book doctor appointments. The tools are passed to the API so that the agent can use them to perform actions related to appointment scheduling.

import OpenAI from "openai";
import { tools } from "./tools.js";
import { OPENAI_API_KEY } from "../config/serverConfig.js";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export async function runAgent(userMessage) {
  const response = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      {
        role: "system",
        content:
          "You are a hospital assistant that helps patients book doctor appointments.",
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
    tools: tools,
  });

  return response;
}
