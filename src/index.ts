import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";
import authRouter from "./routes/authRoute";
import usersRouter from "./routes/usersRoute";

config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users/:username", usersRouter);

mongoose.connect(process.env.MONGO_URL ?? "").then(() => {
  console.log(`Listening on port ${process.env.PORT}`);
  app.listen(process.env.PORT);
});
