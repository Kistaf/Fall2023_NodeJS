import path from "path";
import express from "express";
const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.static("public/topics"));

app.get("/", (_, res) => {
  res.sendFile(path.resolve("./public/home.html"));
});

const users = [];

app.get("/signup", (_, res) => {
  res.sendFile(path.resolve("./public/signup/signup.html"));
});

app.get("/login", (_, res) => {
  res.sendFile(path.resolve("./public/login/login.html"));
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
  res.sendFile(path.resolve("./public/admin.html"));
});

// topic pages
app.get("/functions", (_, res) => {
  res.sendFile(path.resolve("./public/topics/functions/functions.html"));
});

app.get("/variables", (_, res) => {
  res.sendFile(path.resolve("./public/topics/variables/variables.html"));
});

app.get("/terminal", (_, res) => {
  res.sendFile(path.resolve("./public/topics/terminal/terminal.html"));
});

app.get("/commands", (_, res) => {
  res.sendFile(path.resolve("./public/topics/commands/commands.html"));
});

app.get("/express", (_, res) => {
  res.sendFile(path.resolve("./public/topics/express/express.html"));
});

app.get("/data-types", (_, res) => {
  res.sendFile(path.resolve("./public/topics/data-types/data_types.html"));
});

app.get("/rest", (_, res) => {
  res.sendFile(path.resolve("./public/topics/rest/rest.html"));
});

app.get("/import-export", (_, res) => {
  res.sendFile(
    path.resolve("./public/topics/import-export/import_export.html")
  );
});

app.get("/array-methods", (_, res) => {
  res.sendFile(path.resolve("./public/topics/array-methods/array.html"));
});

app.get("/fetch", (_, res) => {
  res.sendFile(path.resolve("./public/topics/fetch/fetch.html"));
});

app.get("/mix", (_, res) => {
  res.sendFile(path.resolve("./public/topics/mix/mix.html"));
});

app.get("/repl", (_, res) => {
  res.sendFile(path.resolve("./public/topics/repl/repl.html"));
});

app.get("/redirection", (_, res) => {
  res.sendFile(path.resolve("./public/topics/redirection/redirection.html"));
});

const PORT = 8080;
app.listen(PORT, (err) => {
  if (err) {
    console.log("Server failed to start", err);
    return;
  }
  console.log("Server is running on port", PORT);
});
