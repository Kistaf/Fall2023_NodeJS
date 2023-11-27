import type { Express } from "express";
import { createServer } from "http";
import socketAuthMiddleware from "../middleware/socket-auth.ts";
import { Server } from "socket.io";
import {
  registerChatHandlers,
  registerNotificationHandlers,
  registerUserHandlers,
} from "./handlers/index.ts";
import socketRepository from "../repositories/socketRepository.ts";

export const socketServer = (app: Express) => {
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: `${process.env.ALLOWED_URL}`,
      credentials: true,
    },
  });

  io.use(socketAuthMiddleware);

  io.on("connection", (socket) => {
    registerChatHandlers(socket, io);
    registerUserHandlers(socket, io);
    registerNotificationHandlers(socket, io);

    socket.on("discconect", () => socketRepository.removeConnection(socket.id));
  });

  return server;
};
