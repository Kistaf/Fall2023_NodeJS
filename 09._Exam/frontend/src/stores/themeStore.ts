import { writable } from "svelte/store";

const getCurrentTheme = () => localStorage.getItem("theme");

function createThemeStore() {
  const body = document.getElementsByTagName("body")[0];
  let savedTheme = getCurrentTheme() as "light" | "dark" | undefined;

  if (!savedTheme) {
    savedTheme = "light";
    localStorage.setItem("theme", savedTheme);
  }

  body.classList.add(savedTheme);

  const { subscribe, update } = writable<"light" | "dark">(savedTheme);

  return {
    subscribe,
    toggleTheme: () => {
      update((prev) => {
        let newTheme: "light" | "dark" = prev;
        if (prev === "dark") newTheme = "light";
        if (prev === "light") newTheme = "dark";

        body.classList.remove(prev);
        body.classList.add(newTheme);

        localStorage.setItem("theme", newTheme);
        return newTheme;
      });
    },
  };
}

export default createThemeStore();
