export const extractOtherPartKey = (participantAId: string, userId: string) =>
  participantAId === userId ? "participantB" : "participantA";

export const extractFriendKey = (senderId: string, userId: string) =>
  senderId === userId ? "receiver" : "sender";
