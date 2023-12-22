import type { User, UsersToConversation } from "./types";

export const extractOtherPartKey = (participantAId: string, userId: string) =>
  participantAId === userId ? "participantB" : "participantA";

export const extractFriendKey = (senderId: string, userId: string) =>
  senderId === userId ? "receiver" : "sender";

export const conversationTitle = (
  users: UsersToConversation[],
  selfId: string,
) => {
  let joinedEntries = "";
  users.forEach((entry) => {
    if (entry.user.id === selfId) return;
    if (joinedEntries) {
      joinedEntries += `, ${entry.user.email}`;
    } else {
      joinedEntries = entry.user.email;
    }
  });
  return joinedEntries;
};
