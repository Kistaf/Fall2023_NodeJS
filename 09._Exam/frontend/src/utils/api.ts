type Method = "POST" | "GET" | "PUT" | "PATCH" | "DELETE";

export const apiOptions = (method: Method): RequestInit => {
  return {
    method: method,
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  };
};
