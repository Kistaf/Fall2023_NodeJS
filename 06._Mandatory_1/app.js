import path from "path";
import express from "express";
const app = express();

app.use(express.static("public"));
app.use(express.static("public/topics"));

app.get("/", (_, res) => {
  res.sendFile(path.resolve("./public/home.html"));
});

app.get("/login", (req, res) => {
  if (req.body === undefined) {
    return res.sendFile(path.resolve("./public/login.html"));
  }
  const { username, password } = req.body;

  // hardcoded values for now
  if (username !== "Hello" || password !== "World") {
    return res.status(404).send({ message: "Incorrect credentials" });
  }
  res.redirect("/admin");
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
