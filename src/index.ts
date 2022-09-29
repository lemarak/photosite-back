import express, { Application, Request, Response } from "express";
import formidable from "express-formidable";
import cors from "cors";
import errorHandler from "errorhandler";
const path = require("path");
import "dotenv/config";
import "./database";
import index from "./routes";

const app: Application = express();
const port: string | number = process.env.PORT || 3100;
app.use(formidable());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Routes
app.use(index);

// Middleware Error
if (process.env.NODE_ENV === "developpment") {
  app.use(errorHandler());
}

app.get("/", (_: Request, res: Response) => {
  res.status(200).json({ message: "Hello, welcome on PhotoSite" });
});

app.get("*", (_: Request, res: Response) => {
  res.status(404).json({ error: "Photosite : lost" });
});

app.listen(port, () => {
  console.log("Server Photosite has started");
});
