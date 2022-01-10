import express, { Request, Response } from "express";
import formidable from "express-formidable";
import cors from "cors";
import errorHandler from "errorHandler";
// const cloudinary = require("cloudinary").v2;
import * as cloudinary from "cloudinary";
import * as dotenv from "dotenv";
import "./database";

dotenv.config();
console.log("Coucou");
const app = express();

app.use(formidable());
app.use(cors());

// cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Routes
import userRoutes from "./routes/user";
app.use(userRoutes);
import pictureRoutes from "./routes/picture";
app.use(pictureRoutes);
import categoryRoutes from "./routes/category";
app.use(categoryRoutes);

// Middleware Error

if (process.env.NODE_ENV === "developpment") {
  app.use(errorHandler());
}

app.use((err: any, _: Request, res: Response) => {
  const env = process.env.NODE_ENV;
  console.error("Error");
  if (env === "production") {
    res.status(500).json({
      code: err.code || 500,
      message: err.message,
    });
  }
});

app.get("/", (_: Request, res: Response) => {
  res.status(200).json({ message: "Hello, welcome on PhotoSite" });
});

app.get("*", (_: Request, res: Response) => {
  res.status(404).json({ error: "Photosite : lost" });
});

app.listen(process.env.PORT, () => {
  console.log("Server Photosite has started");
});
