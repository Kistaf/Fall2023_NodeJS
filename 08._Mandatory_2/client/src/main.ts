import "./app.css";
import App from "./App.svelte";
import { SvelteToast } from "@zerodevx/svelte-toast";

const toastApp = new SvelteToast({
  target: document.body,
});

const app = new App({
  target: document.getElementById("app"),
});

export default app;
