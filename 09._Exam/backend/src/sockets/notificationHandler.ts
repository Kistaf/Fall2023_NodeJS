import type { Socket } from "socket.io";

export default (socket: Socket) => {
  const sendFriendNotification = (payload: string) => {
    console.log(payload);
  };

  socket.on("notification:friend:add", sendFriendNotification);
};
