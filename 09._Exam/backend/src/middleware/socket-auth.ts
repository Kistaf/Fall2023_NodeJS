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
      throw new Error("Missing session cookie");
    }
    const session = getCookies(socket.handshake.headers.cookie)["session"];

    if (!session) {
      throw new Error("Not authorized");
    }

    const verified = await admin.auth().verifySessionCookie(session);

    if (!verified) {
      throw new Error("Invalid session token");
    } else {
      return next();
    }
  } catch (error) {
    socket.disconnect();
    return next(error);
  }
};

export default socketAuthMiddleware;
