import { Request, Response } from "express";
import userModel from "../models/userModel";

const addListController = async (req: Request, res: Response) => {
  const { username } = req.params;
  const { title } = req.body;

  if (typeof title !== "string" || title.length === 0)
    return res.status(400).send("Invalid request");

  await userModel.updateOne(
    { username },
    {
      $push: { lists: { title, isPublic: false, todos: [] } },
    }
  );

  res.sendStatus(200);
};

export default addListController;
