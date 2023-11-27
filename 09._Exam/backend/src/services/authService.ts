import type { Request, Response } from "express";
import { admin } from "../lib/firebase/firebase.ts";

export type AuthService = {
  sessionLogin: (request: Request, response: Response) => void;
  sessionLogout: (request: Request, response: Response) => void;
  checkSession: (request: Request, response: Response) => void;
};

const createAuthService = (): AuthService => {
  const sessionLogin = async (request: Request, response: Response) => {
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
  };

  const sessionLogout = async (request: Request, response: Response) => {
    const sessionCookie = request.cookies.session || "";
    response.clearCookie("session");
    admin
      .auth()
      .verifySessionCookie(sessionCookie)
      .then((decodedClaims) => {
        admin.auth().revokeRefreshTokens(decodedClaims.sub);
        response.send("Logged out");
      });
  };

  const checkSession = (request: Request, response: Response) => {
    const user = request.user;
    response.send({ user: user });
  };

  return {
    sessionLogin,
    sessionLogout,
    checkSession,
  };
};

export default createAuthService();
