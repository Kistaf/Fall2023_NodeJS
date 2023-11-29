import type { Request, Response } from "express";
import { admin } from "../lib/firebase/firebase.ts";
import userRepository from "../repositories/userRepository.ts";
import { nanoid } from "nanoid";

export type AuthService = {
  registerCredentials: (request: Request, response: Response) => void;
  sessionLogin: (request: Request, response: Response) => void;
  sessionLogout: (request: Request, response: Response) => void;
  checkSession: (request: Request, response: Response) => void;
};

const createAuthService = (): AuthService => {
  const registerCredentials = async (request: Request, response: Response) => {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).send("Missing required credentials");
    }

    try {
      const userRecord = await admin.auth().createUser({
        uid: nanoid(),
        email: email,
        password: password,
      });

      const user = await userRepository.createUser(
        userRecord.uid,
        userRecord.email
      );

      if (!user) {
        await admin.auth().deleteUser(userRecord.uid);
        return response.status(400).send("Something went wrong");
      }

      response.send("Successfully signed up");
    } catch (error) {
      return response.status(400).send("Something went wrong");
    }
  };

  const sessionLogin = async (request: Request, response: Response) => {
    const { idToken } = request.body;
    if (!idToken) {
      return response.status(400).send("MISSING CREDENTIALS");
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (!decodedToken) {
      return response.status(400).send("Invalid iDToken");
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
    const userId = request.userId;
    response.send({ userId: userId });
  };

  return {
    registerCredentials,
    sessionLogin,
    sessionLogout,
    checkSession,
  };
};

export default createAuthService();
