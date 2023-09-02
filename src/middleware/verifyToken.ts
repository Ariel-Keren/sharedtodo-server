import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { config } from "dotenv";

config();

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  if (!process.env.SECRET_KEY)
    return res.status(500).send("The server encountered an error.");

  const token = req.headers.authorization;

  if (!token) return res.status(401).send("Unauthenticated");

  verify(token, process.env.SECRET_KEY, (error) => {
    if (error) return res.status(403).send("Unauthorized");
    next();
  });
};

export default verifyToken;
