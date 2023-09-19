import path from "path";
import express from "express";
const app = express();

app.use(express.static("public"));

app.get("/", (_, res) => {
  res.sendFile(path.resolve("./public/frontpage.html"));
});

const PORT = 8080;
app.listen(PORT, (err) => {
  if (err) {
    console.log("Server failed to start", err);
    return;
  }
  console.log(`Server running at http://localhost:${PORT}`);
});
