import type { Socket } from "socket.io";
import { IO } from "../../types/general.ts";
import { ChatMessagePayload } from "../../types/payload.ts";

export default (socket: Socket, io: IO) => {
  const isTyping = (payload: { convId: string }) => {
    io.to(`conv-${payload.convId}`).emit("typing:ongoing", {
      convId: payload.convId,
    });
  };

  const stoppedTyping = (payload: { convId: string }) => {
    io.to(`conv-${payload.convId}`).emit("typing:stopped", {
      convId: payload.convId,
    });
  };

  socket.on("isTyping", isTyping);
  socket.on("stoppedTyping", stoppedTyping);
};
