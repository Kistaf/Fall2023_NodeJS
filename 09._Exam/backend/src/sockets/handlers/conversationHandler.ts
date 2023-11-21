import type { Socket } from "socket.io";

export default (socket: Socket) => {
  const sendMessage = (payload: string) => {
    console.log(payload);
  };

  socket.on("conversation:message:sent", sendMessage);
};
