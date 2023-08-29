const express = require("express");
const app = express();
const port = 8080;

app.get("/", (_, res) => {
  res.send({ hello: "world" });
});

const dogs = {
  1: {
    type: "Labrador",
  },
  2: {
    type: "French bulldog",
  },
};

app.get("/dog", (_, res) => {
  res.send({ data: "woof" });
});

app.get("/dog/:id", (req, res) => {
  const { id } = req.params;
  res.send(dogs[id]);
});

let balance = 100;
app.get("/wallet/:withdrawelAmount", (req, res) => {
  const { withdrawelAmount } = req.params;
  if (!withdrawelAmount) {
    res.send({ message: "Please enter a withdrawel amount" });
  }
  balance -= withdrawelAmount;

  if (balance < 0) {
    balance += withdrawelAmount;
    res.send({ message: "You can't withdraw. No more money left." });
  } else {
    res.send({
      message: `You've withdrawn ${withdrawelAmount}. Your new balance is: ${balance}`,
    });
  }
});

app.listen(port, () => console.log("Server is running"));
