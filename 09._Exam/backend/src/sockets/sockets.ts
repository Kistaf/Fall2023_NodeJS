import type { Express } from "express";
import { createServer } from "http";
import socketAuthMiddleware from "../middleware/socket-auth.ts";
import type { Socket } from "socket.io";
import { Server } from "socket.io";
import {
  registerConversationHandlers,
  registerNotificationHandlers,
  registerUserHandlers,
} from "./handlers/index.ts";
import { Connection } from "../types/sockets.ts";

export let connections: Connection[] = [];

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
    registerConversationHandlers(socket);
    registerUserHandlers(socket);
    registerNotificationHandlers(socket);

    socket.on("disconnect", () => {
      connections = connections.filter((conn) => conn.socketId !== socket.id);
    });
  });

  return server;
};
