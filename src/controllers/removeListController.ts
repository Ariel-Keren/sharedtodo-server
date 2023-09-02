import { Request, Response } from "express";
import userModel from "../models/userModel";

const removeListController = async (req: Request, res: Response) => {
  const { username, listIndex } = req.params;

  if (!Number.isInteger(Number(listIndex)) || Number(listIndex) < 0)
    return res.status(400).send("Invalid request");

  const user = await userModel.findOne({ username });

  if (!user) return res.status(404).send("This user does not exist.");
  if (Number(listIndex) >= user.lists.length)
    return res.status(400).send("Invalid list index");

  user.lists.splice(Number(listIndex), 1);
  await user.save();

  res.sendStatus(200);
};

export default removeListController;
