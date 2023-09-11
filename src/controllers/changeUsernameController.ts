import { Request, Response } from "express";
import userModel from "../models/userModel";

const changeUsernameController = async (req: Request, res: Response) => {
  const { username } = req.params;
  const { newUsername } = req.body;

  if (typeof newUsername !== "string")
    return res.status(400).send("Invalid request");

  const isUsernameTaken = await userModel.exists({ username: newUsername });

  if (isUsernameTaken)
    return res.status(400).send("This username is already taken.");

  await userModel.updateOne({ username }, { $set: { username: newUsername } });

  res.sendStatus(200);
};

export default changeUsernameController;
