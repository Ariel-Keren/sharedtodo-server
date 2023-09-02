import { Request, Response } from "express";
import userModel from "../models/userModel";

const toggleCompleteController = async (req: Request, res: Response) => {
  const { username, listIndex, todoIndex } = req.params;
  const { isCompleted } = req.body;

  if (
    typeof isCompleted !== "boolean" ||
    !Number.isInteger(Number(listIndex)) ||
    Number(listIndex) < 0 ||
    !Number.isInteger(Number(todoIndex)) ||
    Number(todoIndex) < 0
  )
    return res.status(400).send("Invalid request");

  await userModel.updateOne(
    { username },
    {
      $set: {
        [`lists.${Number(listIndex)}.todos.${Number(todoIndex)}.isCompleted`]:
          isCompleted,
      },
    }
  );

  res.sendStatus(200);
};

export default toggleCompleteController;
