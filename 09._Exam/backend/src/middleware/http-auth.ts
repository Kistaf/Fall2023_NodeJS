import type { Request, Response, NextFunction } from "express";
import { admin } from "../lib/firebase/firebase.ts";

export const isAuth = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const session = request.cookies.session;
  if (!session) {
    return response.status(400).send("Missing session");
  }

  const verified = await admin.auth().verifySessionCookie(session);

  if (verified) return next();
  return response.status(404).send("Unauthorized");
};
