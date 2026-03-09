// This file sets up a WebSocket server that listens for incoming audio data from clients. When a client connects and sends an audio message, the server processes it by converting the audio to text, running the AI agent to generate a reply, and then converting the reply back to speech. Finally, it sends the transcript, reply, and voice data back to the client in JSON format.

import { WebSocketServer } from "ws";
import { speechToTextService } from "../services/speechService.js";
import { runAgent } from "../agent/agent.js";
import { textToSpeechService } from "../services/ttsService.js";

export function startSocketServer(server) {

  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {

    console.log("Client connected");

    ws.on("message", async (audioBuffer) => {

      try {

        // convert audio → text
        const transcript = await speechToTextService(audioBuffer);

        // run AI agent
        const reply = await runAgent(transcript, "voice-session");

        // convert text → speech
        const voice = await textToSpeechService(reply);

        ws.send(JSON.stringify({
          transcript,
          reply,
          voice
        }));

      } catch (err) {

        console.error(err);

      }

    });

  });

}