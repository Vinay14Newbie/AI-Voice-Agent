import { runAgent } from "../agent/agent.js";

export async function chat(req, res) {
  try {
    const { message, sessionId } = req.body;

    const reply = await runAgent(message, sessionId);

    res.json({ reply });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "AI agent failed",
    });
  }
}
