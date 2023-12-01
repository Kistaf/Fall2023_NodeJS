import type { Credentials } from "./types";

type Method = "POST" | "GET" | "PUT" | "PATCH" | "DELETE";

const apiOptions = (method: Method): RequestInit => {
  return {
    method: method,
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  };
};

const createApi = () => {
  const fetchSessionLogin = async (idToken: string) => {
    return await fetch(`${import.meta.env.VITE_API_URL}/auth/sessionLogin`, {
      ...apiOptions("POST"),
      body: JSON.stringify({ idToken: idToken }),
    });
  };

  const fetchSessionLogout = async () => {
    return await fetch(
      `${import.meta.env.VITE_API_URL}/auth/sessionLogout`,
      apiOptions("POST"),
    );
  };

  const fetchCheckSession = async () => {
    return await fetch(
      `${import.meta.env.VITE_API_URL}/auth/checkSession`,
      apiOptions("GET"),
    );
  };

  const signInCredentials = async (data: Credentials) => {
    return await fetch(
      `${import.meta.env.VITE_API_URL}/auth/signup/credentials`,
      {
        ...apiOptions("POST"),
        body: JSON.stringify(data),
      },
    );
  };

  const requestFriend = async (friendEmail: string) => {
    return await fetch(`${import.meta.env.VITE_API_URL}/friends`, {
      ...apiOptions("POST"),
      body: JSON.stringify({ friendEmail: friendEmail }),
    });
  };

  const acceptFriend = async (frqId: string) => {
    return await fetch(`${import.meta.env.VITE_API_URL}/friends/${frqId}`, {
      ...apiOptions("POST"),
    });
  };

  const deleteFriend = async (frqId: string) => {
    return await fetch(`${import.meta.env.VITE_API_URL}/friends/${frqId}`, {
      ...apiOptions("DELETE"),
    });
  };

  const fetchFriends = async () => {
    return await fetch(
      `${import.meta.env.VITE_API_URL}/friends`,
      apiOptions("GET"),
    );
  };

  const fetchConversations = async () => {
    return await fetch(
      `${import.meta.env.VITE_API_URL}/conversations`,
      apiOptions("GET"),
    );
  };

  const sendMessage = async (message: string, convId: string) => {
    return await fetch(`${import.meta.env.VITE_API_URL}/messages`, {
      ...apiOptions("POST"),
      body: JSON.stringify({
        message: message,
        convId: convId,
      }),
    });
  };

  return {
    auth: {
      signInCredentials,
      fetchSessionLogin,
      fetchSessionLogout,
      fetchCheckSession,
    },
    friends: {
      requestFriend,
      fetchFriends,
      acceptFriend,
      deleteFriend,
    },
    conversations: {
      fetchConversations,
    },
    messages: {
      sendMessage,
    },
  };
};

export default createApi();
