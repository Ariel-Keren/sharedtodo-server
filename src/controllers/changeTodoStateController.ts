import { Request, Response } from "express";
import userModel from "../models/userModel";

const changeTodoStateController = async (req: Request, res: Response) => {
  const { username, listIndex, todoIndex } = req.params;

  if (
    !Number.isInteger(Number(listIndex)) ||
    Number(listIndex) < 0 ||
    !Number.isInteger(Number(todoIndex)) ||
    Number(todoIndex) < 0
  )
    return res.status(400).send("Invalid request");

  const user = await userModel.findOne({ username });

  if (!user) return res.status(404).send("This user does not exist.");
  if (
    Number(listIndex) >= user.lists.length ||
    Number(todoIndex) >= user.lists[Number(listIndex)].todos.length
  )
    return res.status(400).send("Invalid request");

  if (user.lists[Number(listIndex)].todos[Number(todoIndex)].isTrash)
    user.lists[Number(listIndex)].todos[Number(todoIndex)].isTrash = false;
  else
    user.lists[Number(listIndex)].todos[Number(todoIndex)].isCompleted =
      !user.lists[Number(listIndex)].todos[Number(todoIndex)].isCompleted;

  await user.save();

  res.sendStatus(200);
};

export default changeTodoStateController;
