const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");

const app = express();

app.use(formidable());

mongoose.connect("mongodb://localhost/photosite-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
const userRoutes = require("./routes/user");
app.use(userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello, welcome on PhoSite" });
});

app.get("*", (req, res) => {
  res.status(404).json({ error: "Photosite : lost" });
});

app.listen(3100, () => {
  console.log("Server Photosite has started");
});
