const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello, welcome on PhoSite" });
});

app.get("*", (req, res) => {
  res.status(404).json({ error: "Photosite : lost" });
});

app.listen(3100, () => {
  console.log("Server Photosite has started");
});
