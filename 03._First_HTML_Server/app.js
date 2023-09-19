const express = require("express");
const app = express();

app.use(express.static("public"));

const { getWelcomeMessage } = require("./Util/welcomeMessageUtil");

app.get("/", (_, res) => {
  res.sendFile(__dirname + "/public/home.html");
});

app.get("/second", (_, res) => {
  res.sendFile(__dirname + "/public/secondPage.html");
});

app.get("/welcomeMessage", (req, res) => {
  const { clientName } = req.query;
  const message = getWelcomeMessage(clientName);
  res.send({ data: message });
});

const PORT = 8080;
app.listen(PORT, (err) => {
  if (err) {
    console.log("Failed to start server", err);
    return;
  }
  console.log(`Server is running at http://localhost:${PORT}`);
});
