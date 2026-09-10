import type { Request, Response } from "express";
import { User } from "../../models";

export const getUsersController = async (req: Request, res: Response) => {
  const users = await User.find({});

  res.send(users);
};
