// This file defines the speechToTextService function, which uses the Deepgram API to transcribe audio files into text. The function takes the path to an audio file as input, reads the file, and sends it to the Deepgram API for transcription. The resulting transcript is then returned as a string. This service can be used by the agent to convert user voice input into text for further processing.

import { createClient } from "@deepgram/sdk";
import fs from "fs";
import { DEEPGRAM_API_KEY } from "../config/serverConfig";

const deepgram = createClient(DEEPGRAM_API_KEY);

export async function speechToTextService(audioPath) {
  const audio = fs.readFileSync(audioPath);

  const response = await deepgram.listen.prerecorded.transcribeFile(audio, {
    model: "nova-2",
    smart_format: true,
  });

  return response.result.results.channels[0].alternatives[0].transcript;
}
