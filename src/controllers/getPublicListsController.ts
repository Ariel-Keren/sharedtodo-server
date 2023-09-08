import { Request, Response } from "express";
import userModel from "../models/userModel";

const getPublicListsController = async (req: Request, res: Response) => {
  const { username } = req.params;

  const user = await userModel.findOne({ username });

  if (!user) return res.status(404).send("This user doesn't exist");

  res
    .status(200)
    .json({ publicLists: user.lists.filter((list) => list.isPublic) });
};

export default getPublicListsController;
