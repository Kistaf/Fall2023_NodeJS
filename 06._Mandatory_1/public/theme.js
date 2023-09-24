const toggleTheme = (themeButton) => {
  const theme = localStorage.getItem("theme");
  const body = document.getElementsByTagName("body")[0];
  body.classList.remove(theme);
  if (theme === "dark") {
    const newTheme = "light";
    body.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  } else if (theme === "light") {
    const newTheme = "dark";
    body.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
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
  const defaultTheme = "light";
  const body = document.getElementsByTagName("body")[0];
  if (theme) {
    body.classList.add(theme);
  } else {
    body.classList.add(defaultTheme);
    localStorage.setItem("theme", defaultTheme);
  }
  renderThemeButton(themeButton);
  themeButton.onclick = () => toggleTheme(themeButton);
};
