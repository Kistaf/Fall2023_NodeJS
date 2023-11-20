import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";

import {
  registerConversationHandlers,
  registerNotificationHandlers,
  registerUserHandlers,
} from "./sockets/index.ts";
import authRouter from "./routers/authRouter.ts";
import socketAuthMiddleware from "./middleware/socket-auth.ts";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(
  cors({
    origin: `${process.env.ALLOWED_URL}`,
    credentials: true,
  })
);

app.use(authRouter);

// =========== SocketIO ===========
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
});
// =========== SocketIO ===========

const PORT = 8080 ?? Number(process.env.PORT);
server.listen(PORT, () => console.log("Server running at port:", PORT));
