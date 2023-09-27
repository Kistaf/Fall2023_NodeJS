const themeLink = (theme) => {
  return `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/atom-one-${theme}.min.css`;
};

const toggleTheme = (themeButton) => {
  const theme = localStorage.getItem("theme");
  const body = document.getElementsByTagName("body")[0];
  body.classList.remove(theme);

  let newTheme;
  newTheme = theme === "dark" ? "light" : "dark";

  body.classList.add(newTheme);
  localStorage.setItem("theme", newTheme);

  const codeTheme = document.getElementById("code-theme");
  if (codeTheme) {
    codeTheme.href = themeLink(newTheme);
  }
  renderThemeButton(themeButton);
};

const renderThemeButton = (themeButton) => {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    themeButton.innerHTML = DOMPurify.sanitize(
      `<i class="bi bi-moon-fill text-gray-500"></i>`
    );
  } else if (theme === "light") {
    themeButton.innerHTML = DOMPurify.sanitize(
      `<i class="bi bi-brightness-high-fill text-yellow-500"></i>`
    );
  }
};

export const initTheme = (themeButton) => {
  const theme = localStorage.getItem("theme");
  const body = document.getElementsByTagName("body")[0];
  let newTheme;

  if (theme) {
    newTheme = theme;
  } else newTheme = "dark";

  body.classList.add(newTheme);
  localStorage.setItem("theme", newTheme);

  const codeTheme = document.getElementById("code-theme");
  if (codeTheme) {
    codeTheme.href = themeLink(newTheme);
  }
  renderThemeButton(themeButton);
  themeButton.onclick = () => toggleTheme(themeButton);
};
