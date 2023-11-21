import { apiOptions } from "../utils/api";

export const fetchSessionLogin = async (idToken: string) => {
  return await fetch(`${import.meta.env.VITE_API_URL}/auth/sessionLogin`, {
    ...apiOptions("POST"),
    body: JSON.stringify({ idToken: idToken }),
  });
};

export const fetchSessionLogout = async () => {
  return await fetch(
    `${import.meta.env.VITE_API_URL}/auth/sessionLogout`,
    apiOptions("POST"),
  );
};

export const checkSession = async () => {
  return await fetch(
    `${import.meta.env.VITE_API_URL}/auth/checkSession`,
    apiOptions("GET"),
  );
};
