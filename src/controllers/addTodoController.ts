import { Request, Response } from "express";
import userModel from "../models/userModel";

const addTodoController = async (req: Request, res: Response) => {
  const { username, listIndex } = req.params;
  const { text } = req.body;

  if (
    typeof text !== "string" ||
    !Number.isInteger(Number(listIndex)) ||
    Number(listIndex) < 0
  )
    return res.status(400).send("Invalid request");

  await userModel.updateOne(
    { username },
    {
      $push: {
        [`lists.${Number(listIndex)}.todos`]: {
          text,
          isCompleted: false,
          isTrash: false,
        },
      },
    }
  );

  res.sendStatus(200);
};

export default addTodoController;
