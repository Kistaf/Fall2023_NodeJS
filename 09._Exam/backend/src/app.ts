import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import cookieParser from "cookie-parser";
import authRouter from "./routers/authRouter.ts";
import { socketServer } from "./sockets/sockets.ts";

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

const server = socketServer(app);

const PORT = 8080 ?? Number(process.env.PORT);
server.listen(PORT, () => console.log("Server running at port:", PORT));
