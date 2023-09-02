import { Request, Response } from "express";
import userModel from "../models/userModel";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "dotenv";

config();

const registerController = async (req: Request, res: Response) => {
  if (!process.env.SECRET_KEY)
    return res.status(500).send("The server encountered an error.");

  const { username, password } = req.body;

  if (typeof username !== "string" || typeof password !== "string")
    return res.status(400).send("The username or password is invalid.");

  const doesUserExist = await userModel.exists({ username });

  if (doesUserExist)
    return res.status(400).send("This username is already taken.");

  const hashedPassword = await hash(password, 10);

  const user = await userModel.create({
    username,
    password: hashedPassword,
    lists: [],
  });

  const token = sign({ id: user._id }, process.env.SECRET_KEY);

  res.status(201).json({ token });
};

export default registerController;
