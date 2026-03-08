import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5000;

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const ELEVENLABS_API_KEY = process.env.ELEVEN_LABS_API_KEY;

export const DATABASE_URL = process.env.DATABASE_URL;

export const REDIS_URL = process.env.REDIS_URL;

export const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;
