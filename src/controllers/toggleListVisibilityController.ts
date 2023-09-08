import { Request, Response } from "express";
import userModel from "../models/userModel";

const toggleListVisibilityController = async (req: Request, res: Response) => {
  const { username, listIndex } = req.params;

  if (!Number.isInteger(Number(listIndex)) || Number(listIndex) < 0)
    return res.status(400).send("Invalid request");

  const user = await userModel.findOne({ username });

  if (!user) return res.status(404).send("This user doesn't exist");
  if (Number(listIndex) >= user.lists.length)
    return res.status(400).send("Invalid request");

  user.lists[Number(listIndex)].isPublic =
    !user.lists[Number(listIndex)].isPublic;
  await user.save();

  res.sendStatus(200);
};

export default toggleListVisibilityController;
