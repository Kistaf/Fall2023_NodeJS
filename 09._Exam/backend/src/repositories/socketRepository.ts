import type { SocketConnection } from "../types/general.ts";

type SocketRepository = {
  connections: SocketConnection[];

  allUsers: () => SocketConnection[];
  connByUserId: (userId: string) => SocketConnection;
  connBySocketId: (socketId: string) => SocketConnection;
  addConnection: (data: SocketConnection) => SocketConnection;
  removeConnection: (userId: string) => void;
};

const createSocketRepository = (): SocketRepository => {
  let connections: SocketConnection[] = [];

  const allUsers = () => connections;

  const connByUserId = (userId: string) =>
    connections.find((conn) => conn.userId === userId);

  const connBySocketId = (socketId: string) =>
    connections.find((conn) => conn.socketId === socketId);

  const addConnection = (data: SocketConnection) => {
    if (!connections.some((conn) => conn.socketId === data.socketId)) {
      connections.push(data);
      return data;
    }
  };

  const removeConnection = (socketId: string) => {
    connections = connections.filter((conn) => conn.socketId !== socketId);
  };

  return {
    connections,
    allUsers,
    connBySocketId,
    connByUserId,
    removeConnection,
    addConnection,
  };
};

export default createSocketRepository();
