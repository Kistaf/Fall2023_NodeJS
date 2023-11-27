export type ChatMessagePayload = {
  chatId: string;
  publisherId: string;
  receiverId: string;
  message: string;
  publishedAt: Date;
};
