import { Request, Response } from "express";
import userModel from "../models/userModel";
import { hash } from "bcrypt";

const changePasswordController = async (req: Request, res: Response) => {
  const { username } = req.params;
  const { newPassword } = req.body;

  if (typeof newPassword !== "string")
    return res.status(400).send("Invalid request");

  const hashedPassword = await hash(newPassword, 10);

  await userModel.updateOne(
    { username },
    { $set: { password: hashedPassword } }
  );

  res.sendStatus(200);
};

export default changePasswordController;
