const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("trust proxy", true);
app.use(express.static("public"));

app.get("/log", (req, res) => {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress;

  const log = `IP: ${ip} | ${new Date().toISOString()}\n`;
  fs.appendFileSync("ips.txt", log);

  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});
