const express = require("express");
const app = express();
const port = 8080;

app.get("/", (_, res) => {
  res.json({ hello: "world" });
});

app.listen(port, () => console.log("Server is running"));
