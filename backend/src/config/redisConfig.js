import { createClient } from "redis";
import { REDIS_URL } from "./serverConfig";

const redisClient = createClient({
  url: REDIS_URL,
});

redisClient.connect();

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

export default redisClient;
