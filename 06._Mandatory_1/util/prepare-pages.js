import { readPage, renderPage } from "./templateEngine.js";

const frontpage = readPage("./public/pages/home/home.html", "Home");
export const frontpagePage = renderPage(frontpage);

const arrayMethods = readPage(
  "./public/pages/topics/array-methods/array.html",
  "Common array methods"
);
export const arrayMethodsPage = renderPage(arrayMethods);

const nodeCommands = readPage(
  "./public/pages/topics/commands/commands.html",
  "Node commands"
);
export const nodeCommandsPage = renderPage(nodeCommands);

const dataTypes = readPage(
  "./public/pages/topics/data-types/data_types.html",
  "Data types"
);
export const dataTypesPage = renderPage(dataTypes);

const express = readPage(
  "./public/pages/topics/express/express.html",
  "Express"
);
export const expressPage = renderPage(express);

const fetch = readPage("./public/pages/topics/fetch/fetch.html", "Fetch");
export const fetchPage = renderPage(fetch);

const functions = readPage(
  "./public/pages/topics/functions/functions.html",
  "Functions & Callbacks"
);
export const functionsPage = renderPage(functions);

const importExport = readPage(
  "./public/pages/topics/import-export/import_export.html",
  "Import & Export"
);
export const importExportPage = renderPage(importExport);

const mix = readPage("./public/pages/topics/mix/mix.html", "Mixed content");
export const mixPage = renderPage(mix);

const redirection = readPage(
  "./public/pages/topics/redirection/redirection.html",
  "Server- & client redirection"
);
export const redirectionPage = renderPage(redirection);

const repl = readPage("./public/pages/topics/repl/repl.html", "REPL");
export const replPage = renderPage(repl);

const rest = readPage(
  "./public/pages/topics/rest/rest.html",
  "REST architecture"
);
export const restPage = renderPage(rest);

const terminal = readPage(
  "./public/pages/topics/terminal/terminal.html",
  "Terminal commands"
);
export const terminalPage = renderPage(terminal);

const variables = readPage(
  "./public/pages/topics/variables/variables.html",
  "Variables & Scope"
);
export const variablesPage = renderPage(variables);
