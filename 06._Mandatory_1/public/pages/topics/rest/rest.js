import { subjects } from "./data.js";
import { render } from "../../../assets/js/render.js";
import { initTheme } from "../../../assets/js/theme.js";

(() => {
  const target = document.getElementById("data");
  render(target, subjects);
  const themeButton = document.getElementById("theme-toggle");
  initTheme(themeButton);
})();
