const express = require("express");
const app = express();

app.get("/", (_, res) => {
  res.send("Hello world");
});

const PORT = 8080;
app.listen(PORT, (err) => {
  if (err) {
    console.log("Server failed to start", err);
    return;
  }
  console.log(`Server running at http://localhost:${PORT}`);
});
