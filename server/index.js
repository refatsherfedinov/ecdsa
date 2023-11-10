const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "03ee8e81697cce46344d94a732ff9df53939b1e3b200be4cfe10a917d850c25451": 1000,//9c42bbcec80de0df0c9e920451c18ba43474ce91f89758987111d250b0be23e8
  "0316eb7070e28d09d3de5e1715b0a43487ee6d3e1e4a55e39c487ff334a663327b": 1000,//cffba109d429bd279808b485dab87b5d07e19d69cdf7739521a5f9d383160708
  "03a238a3f386c28351b25f64942c10b823d0365c5afa2bbd4a18b3a1c26447c0e3": 1000,//7ad2a74aa0fded445288c2bac854c53820bcfedc512875da7571c72a6884ce74
  "033d3ae52cec223e9bd2a7dff593355d1a8d8d8e6500596fc28dd0001694ed6769": 10000,//baafab4216d93b182feb0bd92cbb4e2e0bfe85387676e7ebe6d6c59008c51477
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
