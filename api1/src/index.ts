import express from "express";
import dotenv from "dotenv";

import { authenticationMiddleware } from "./middlewares/authentication.middleware";
import axios from "axios";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello from API1.");
});

app.get("/resource", authenticationMiddleware, async (req, res) => {
  try {
    const secondAPIurl = process.env.API_URL;
    const data = await axios.get(`${secondAPIurl}/resource`, {
      headers: { Authorization: `Bearer ${res.locals.token}` },
    });

    res.send(`Response from API2: '${data}'.`);
  } catch (err) {
    res.status(500).send("Couldn't get response from API2.");
  }
});

app.listen(PORT, () => console.log(`App is listenning on PORT ${PORT}`));
