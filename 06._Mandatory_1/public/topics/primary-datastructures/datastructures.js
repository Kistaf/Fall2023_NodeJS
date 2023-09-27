import { subjects } from "./data.js";
import { render } from "../../render.js";
import { initTheme } from "../../theme.js";

(() => {
  const target = document.getElementById("data");
  render(target, subjects);
  const themeButton = document.getElementById("theme-toggle");
  initTheme(themeButton);
})();
