import { speechToTextService } from "../services/speechService.js";
import { runAgent } from "../agent/agent.js";
import { textToSpeechService } from "../services/ttsService.js";

export async function voiceAssistantController(req, res) {
  const audioPath = req.file.path;

  // 1- speech → text
  const transcript = await speechToTextService(audioPath);

  // 2- AI agent response
  const reply = await runAgent(transcript);

  // 3- text → speech
  const audioResponse = await textToSpeechService(reply);

  res.json({
    transcript,
    reply,
    audio: audioResponse,
  });
}
