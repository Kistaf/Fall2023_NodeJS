import path from "path";
import express from "express";
const app = express();

app.use(express.json());
app.use(express.static("public"));

import * as pages from "./util/prepare-pages.js";

app.get("/", (_, res) => {
  res.send(pages.frontpagePage);
});

const users = [];

app.get("/signup", (_, res) => {
  res.sendFile(path.resolve("./public/pages/signup/signup.html"));
});

app.get("/login", (_, res) => {
  res.sendFile(path.resolve("./public/pages/login/login.html"));
});

app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(404).send({ message: "Missing credentials" });
  }

  if (!users.every((user) => user.username !== username)) {
    return res.status(400).send({ message: "User already exists" });
  }

  const user = {
    username,
    password,
  };
  users.push(user);

  res.send({ status: 200, redirect: "/login" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(404).send({ message: "Missing credentials" });
  }

  const user = users.find((user) => user.username === username);

  if (!user) {
    return res.status(404).send({ message: "No such user found" });
  }

  if (user.password !== password) {
    return res.status(404).send({ message: "Incorrect credentials" });
  }

  res.send({ status: 200, redirect: "/admin" });
});

app.get("/admin", (_, res) => {
  res.sendFile(path.resolve("./public/pages/admin/admin.html"));
});

// topic pages
app.get("/functions", (_, res) => {
  res.send(pages.functionsPage);
});

app.get("/variables", (_, res) => {
  res.send(pages.variablesPage);
});

app.get("/terminal", (_, res) => {
  res.send(pages.terminalPage);
});

app.get("/commands", (_, res) => {
  res.send(pages.nodeCommandsPage);
});

app.get("/express", (_, res) => {
  res.send(pages.expressPage);
});

app.get("/data-types", (_, res) => {
  res.send(pages.dataTypesPage);
});

app.get("/rest", (_, res) => {
  res.send(pages.restPage);
});

app.get("/import-export", (_, res) => {
  res.send(pages.importExportPage);
});

app.get("/array-methods", (_, res) => {
  res.send(pages.arrayMethodsPage);
});

app.get("/fetch", (_, res) => {
  res.send(pages.fetchPage);
});

app.get("/mix", (_, res) => {
  res.send(pages.mixPage);
});

app.get("/repl", (_, res) => {
  res.send(pages.replPage);
});

app.get("/redirection", (_, res) => {
  res.send(pages.redirectionPage);
});

const PORT = 8080;
app.listen(PORT, (err) => {
  if (err) {
    console.log("Server failed to start", err);
    return;
  }
  console.log("Server is running on port", PORT);
});
