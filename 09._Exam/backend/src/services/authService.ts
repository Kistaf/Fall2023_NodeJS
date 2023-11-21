import type { Request, Response } from "express";
import { admin } from "../lib/firebase/firebase.ts";

export const authService = {
  sessionLogin: async (request: Request, response: Response) => {
    const { idToken } = request.body;
    if (!idToken) {
      return response.status(400).send("MISSING CREDENTIALS");
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await admin
      .auth()
      .createSessionCookie(idToken, { expiresIn });

    response.cookie("session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    });

    response.send({ status: "success" });
  },
  sessionLogout: async (request: Request, response: Response) => {
    const sessionCookie = request.cookies.session || "";
    response.clearCookie("session");
    admin
      .auth()
      .verifySessionCookie(sessionCookie)
      .then((decodedClaims) => {
        admin.auth().revokeRefreshTokens(decodedClaims.sub);
        response.send("Logged out");
      });
  },
  checkSession: (request: Request, response: Response) => {
    const userId = request.userId;
    response.send({ userId: userId });
  },
};
