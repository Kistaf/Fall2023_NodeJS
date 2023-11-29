/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background))",
        border: "rgb(var(--border))",
        avatar: "rgb(var(--avatar))",
        message: {
          inputField: "rgb(var(--message-input-field))",
          inputText: "rgb(var(--message-input-text))",
          username: "rgb(var(--message-username))",
          content: "rgb(var(--message-content))",
          date: "rgb(var(--message-date))",
        },
        button: {
          primary: "rgb(var(--button))",
          "primary-hover": "rgb(var(--button-hover))",
          "primary-dark": "rgb(var(--button-dark))",
          "primary-dark-hover": "rgb(var(--button-dark-hover))",
        },
        sidebar: "rgb(var(--background-sidebar))",
        activeChats: "rgb(var(--background-active-chats))",
        primary: {
          DEFAULT: "rgb(var(--primary))",
          foreground: "rgb(var(--primary-text))",
        },
      },
    },
  },
  plugins: [],
};
