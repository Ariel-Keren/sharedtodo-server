import { Request, Response } from "express";
import userModel from "../models/userModel";

const removeTodoController = async (req: Request, res: Response) => {
  const { username, listIndex, todoIndex } = req.params;

  if (
    !Number.isInteger(Number(listIndex)) ||
    Number(listIndex) < 0 ||
    !Number.isInteger(Number(todoIndex)) ||
    Number(todoIndex) < 0
  )
    return res.status(400).send("Invalid request");

  const user = await userModel.findOne({ username });

  if (!user) return res.status(404).send("This user does not exist");
  if (
    Number(listIndex) >= user.lists.length ||
    Number(todoIndex) >= user.lists[listIndex].todos.length
  )
    return res.status(400).send("Invalid request");

  if (user.lists[Number(listIndex)].todos[Number(todoIndex)].isTrash)
    user.lists[Number(listIndex)].todos.splice(Number(todoIndex), 1);
  else user.lists[Number(listIndex)].todos[Number(todoIndex)].isTrash = true;

  res.sendStatus(200);
};

export default removeTodoController;
