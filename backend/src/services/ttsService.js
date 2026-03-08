// This file defines the textToSpeechService function, which uses the ElevenLabs API to convert text into speech. The function takes a string of text as input, sends it to the ElevenLabs API for processing, and saves the resulting audio as an MP3 file. The path to the saved audio file is then returned. This service can be used by the agent to generate spoken responses based on text output.

import fetch from "node-fetch";
import fs from "fs";
import { ELEVENLABS_API_KEY } from "../config/serverConfig";

export async function textToSpeechService(text) {
  const response = await fetch(
    "https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL",
    {
      method: "POST",
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        model_id: "eleven_multilingual_v2",
      }),
    },
  );

  const buffer = await response.arrayBuffer();

  fs.writeFileSync("response.mp3", Buffer.from(buffer));

  return "response.mp3";
}
