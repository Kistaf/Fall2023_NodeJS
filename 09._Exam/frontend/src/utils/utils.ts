export const otherConvParty = (participantAId: string, userId: string) =>
  participantAId === userId ? "participantB" : "participantA";
