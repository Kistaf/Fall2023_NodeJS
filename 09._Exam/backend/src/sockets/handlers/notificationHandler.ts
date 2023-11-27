import type { Socket } from "socket.io";
import { IO } from "../../types/general";

export default (socket: Socket, io: IO) => {
  const sendFriendNotification = (payload: string) => {
    console.log(payload);
  };

  socket.on("notification:friend:add", sendFriendNotification);
};
