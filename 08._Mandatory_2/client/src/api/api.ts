export const fetchSecretMessage = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/mysecret`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  return await response.json();
};
