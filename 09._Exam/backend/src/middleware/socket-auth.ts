import type { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { admin } from "../lib/firebase/firebase.ts";
import { getCookies } from "../utils/cookie.ts";

const socketAuthMiddleware = async (
  socket: Socket,
  next: (err?: ExtendedError) => void
) => {
  try {
    if (!socket.handshake.headers.cookie) {
      throw new Error("Missing cookies");
    }
    const session = getCookies(socket.handshake.headers.cookie)["session"];

    if (!session) {
      throw new Error("No session cookie present");
    }

    const verified = await admin.auth().verifySessionCookie(session);

    if (!verified) {
      throw new Error("Invalid session token");
    } else {
      return next();
    }
  } catch (error) {
    return next(error);
  }
};

export default socketAuthMiddleware;
