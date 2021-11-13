const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

const cloudinary = require("cloudinary").v2;
require("dotenv").config();
require("./database");

const app = express();

app.use(formidable());
app.use(cors());

// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Routes
const userRoutes = require("./routes/user");
app.use(userRoutes);
const pictureRoutes = require("./routes/picture");
app.use(pictureRoutes);
const categoryRoutes = require("./routes/category");
app.use(categoryRoutes);

// Middleware Error
app.use((err, req, res, next) => {
  const env = process.env.NODE_ENV;
  console.error("Error");
  if (env === "developpment") {
    res.status(500).json({
      code: err.code || 500,
      message: err.message,
      stack: err.stack,
    });
  } else {
    res.status(500).json({
      code: err.code || 500,
      message: err.message,
    });
  }
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello, welcome on PhoSite" });
});

app.get("*", (req, res) => {
  res.status(404).json({ error: "Photosite : lost" });
});

app.listen(process.env.PORT, () => {
  console.log("Server Photosite has started");
});
