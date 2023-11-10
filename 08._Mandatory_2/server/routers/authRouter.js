import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma/db.js";
import sendWelcomeMail from "../util/mailer.js";
import { isAuth } from "../middleware/auth.js";
import { Router } from "express";

const router = new Router();

router.get("/auth/checkauth", isAuth, async (req, res) => {
  res.send({ success: "Authenticated", user: req.user });
});

router.post("/auth/signup", async (req, res) => {
  const { email, password, secret } = req.body;
  if (!email || !password || !secret) {
    return res.status(400).send({ error: "Missing email, password or secret" });
  }
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        secret_message: secret,
      },
    });
    await sendWelcomeMail({
      email: email,
      subject: "Account registration",
      text: "Welcome to the site!",
    });
    res.send({ success: "User created" });
  } catch (error) {
    res.status(400).send({ error: "User already exists" });
  }
});

router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ error: "Missing email or password" });
  }

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: email,
      },
    });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send({ error: "Invalid credentials" });
    }

    const token = jwt.sign(user.email, process.env.SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000,
    });

    res.send({ success: "Logged in", email: user.email });
  } catch (error) {
    res.status(400).send({ error: "Invalid credentials" });
  }
});

router.post("/auth/logout", isAuth, async (req, res) => {
  res.cookie("token", "", { maxAge: 1 });
  res.send({ success: "Logged out" });
});

export default router;
