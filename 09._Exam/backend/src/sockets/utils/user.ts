import { connections } from "../sockets.ts";

export const allUsers = () => connections;

export const userByUserId = (userId: string) =>
  connections.find((conn) => conn.userId === userId);

export const userBySocketId = (socketId: string) =>
  connections.find((conn) => conn.socketId === socketId);
