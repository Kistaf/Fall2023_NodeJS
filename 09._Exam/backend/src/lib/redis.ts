import Redis from "ioredis";
export const redis = new Redis(process.env.REDIS_URL);

type Message = {
  id: number;
  senderId: number;
  recipientId: number;
  content: string;
  timestamp: string;
};

export async function storeMessage(conversationId: string, message: Message) {
  const messageData = JSON.stringify(message);
  await redis.rpush(`conversations:${conversationId}`, messageData);
}

export async function getChatHistory(conversationId: string, limit = 50) {
  await redis.lrange(
    `conversations:${conversationId}`,
    0,
    limit - 1,
    (err, messages) => {
      if (err) {
        console.error("Error retrieving chat history:", err);
        return;
      }

      const parsedMessages: Message[] = messages.map((message) =>
        JSON.parse(message)
      );
      console.log("Chat history:", parsedMessages);
    }
  );
}
