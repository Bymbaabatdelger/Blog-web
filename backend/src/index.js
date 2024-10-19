import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDatabase } from "./utils/db.js";
import { user } from "./router/user.js";
import { blog } from "./router/blog.js";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/users', user)
app.use('/blogs', blog)

app.get("/", (req, res) => {
  res.status(200).send({ success: true });
});

app.listen(PORT, () => {
  connectDatabase();
  console.log(`app running successfully , ${PORT}`);
});
