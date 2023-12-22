import type { SocketConnection } from "../types/general.ts";

const createSocketRepository = () => {
  let connections: SocketConnection[] = [];

  const allUsers = () => connections;

  const connByUserId = (userId: string) =>
    connections.find((conn) => conn.userId === userId);

  const addConnection = (data: SocketConnection) => {
    if (!connections.some((conn) => conn.socketId === data.socketId)) {
      connections.push(data);
      return data;
    }
  };

  const socketIdsFromUserIds = (userIds: string[]) => {
    const socketIds = userIds
      .map((userId) => connByUserId(userId)?.socketId)
      .filter((entry) => entry !== undefined);
    return socketIds;
  };

  const removeConnection = (socketId: string) => {
    connections = connections.filter((conn) => conn.socketId !== socketId);
  };

  return {
    connections,
    allUsers,
    connByUserId,
    removeConnection,
    addConnection,
    socketIdsFromUserIds,
  };
};

export default createSocketRepository();
