import prisma from "./prisma/db.js";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { isAuth } from "./middleware/auth.js";
import AuthRouter from "./routers/authRouter.js";
import { specificURLCORS } from "./middleware/cors.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(specificURLCORS);
app.use(cookieParser());

// routers
app.use(AuthRouter);

app.get("/mysecret", isAuth, async (req, res) => {
  const userEmail = req.user;
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });
  res.send({
    sucess: "Successfully fetched secret message",
    secret: user.secret_message,
  });
});

const PORT = Number(process.env.PORT) ?? 8080;
app.listen(PORT, (error) => {
  if (error) {
    console.log("Server failed to start:", error);
    return;
  }
  console.log("Server is running on port:", PORT);
});
