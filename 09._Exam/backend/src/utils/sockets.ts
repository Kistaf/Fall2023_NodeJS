import socketRepository from "../repositories/socketRepository.ts";

export const findActiveReceivers = (ids: string[]): string[] => {
  return ids
    .map((id) => socketRepository.connByUserId(id)?.socketId)
    .filter((entry) => entry !== undefined);
};
