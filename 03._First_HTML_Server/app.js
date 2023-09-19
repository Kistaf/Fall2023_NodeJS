const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", (_, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/second", (_, res) => {
  res.sendFile(__dirname + "/public/secondPage.html");
});

const PORT = 8080;
app.listen(PORT, (err) => {
  if (err) {
    console.log("Failed to start server", err);
    return;
  }
  console.log(`Server is running at http://localhost:${PORT}`);
});
