import { auth } from "./middlewares/authentication.middleware";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello from API2.");
});

app.get("/resource", auth, (req, res) => {
  res.send("Hello from protected API2.");
});

app.listen(PORT, () => console.log(`App is listenning on port ${PORT}`));
