import redisClient from "../config/redisConfig.js";

const EXPIRATION = 60 * 60; // 1 hour

export async function getConversationService(sessionId) {
  const data = await redisClient.get(sessionId);

  if (!data) return [];

  return JSON.parse(data);
}

export async function saveConversationS(sessionId, messages) {
  await redisClient.set(sessionId, JSON.stringify(messages), {
    EX: EXPIRATION,
  });
}
