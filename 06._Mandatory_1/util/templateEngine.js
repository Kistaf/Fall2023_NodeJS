import fs from "fs";

export const readPage = (filePath) => {
  return fs.readFileSync(filePath).toString();
};

export const renderPage = (page, tabTitle) => {
  const header = fs
    .readFileSync("./public/components/header/header.html")
    .toString()
    .replace("$TAB_TITLE", tabTitle ?? "NodeJS");

  const ender = fs
    .readFileSync("./public/components/ender/ender.html")
    .toString();

  return header + page + ender;
};
