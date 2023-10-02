import { initTheme } from "./theme.js";

const topics = [
  {
    topic: "Functions & callbacks",
    link: "functions",
  },
  {
    topic: "Variables & Scope",
    link: "variables",
  },
  {
    topic: "Terminal commands",
    link: "terminal",
  },
  {
    topic: "NodeJS commands",
    link: "commands",
  },
  {
    topic: "Express",
    link: "express",
  },
  {
    topic: "Data types",
    link: "data-types",
  },
  {
    topic: "Rest architecture",
    link: "rest",
  },
  {
    topic: "Import & Export",
    link: "import-export",
  },
  {
    topic: "Server- & Clientside redirection",
    link: "redirection",
  },
  {
    topic: "Common array methods",
    link: "array-methods",
  },
  {
    topic: "Fetch",
    link: "fetch",
  },
  {
    topic: "Mixed",
    link: "mix",
  },
  {
    topic: "REPL",
    link: "repl",
  },
];

(() => {
  document.getElementById("search").oninput = (e) => search(e);
  render(topics);
  const themeButton = document.getElementById("theme-toggle");
  initTheme(themeButton);
})();

function topicElement(topic) {
  return `
    <a href="${topic.link}" class="rounded-lg border dark:border-gray-800 shadow-sm h-12 flex items-center px-6 hover:scale-105 transition-transform duration-200">
      <h2 class="text-lg text-[#272c34] font-medium dark:text-white">${topic.topic}</h2>
    </a>
  `;
}

function search(event) {
  const value = event.target.value;
  let options = [];
  if (value.length === 0) {
    options = topics;
  } else {
    options = topics.filter((topic) =>
      topic.topic.toLowerCase().includes(value.toLowerCase())
    );
  }
  render(options);
}

function render(data) {
  const topicsElement = document.getElementById("topics");
  const htmlString = data.map((topic) => topicElement(topic)).join("");
  topicsElement.innerHTML = DOMPurify.sanitize(htmlString);
}
