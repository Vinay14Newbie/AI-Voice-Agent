import { runAgent } from "../agent/agent.js";

export async function chat(req, res) {

  try {

    const { message } = req.body;

    const reply = await runAgent(message);

    res.json({ reply });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "AI agent failed"
    });

  }
}