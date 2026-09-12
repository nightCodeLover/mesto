import type { Request, Response } from "express";
import { User } from "../../models";
import {
  noAuthError, NotAuthorizedError, NotFoundError, userErrors,
} from "../../errors";

export const getMeController = async (req: Request, res: Response) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new NotAuthorizedError(noAuthError.message);
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new NotFoundError(userErrors.noUser.message);
  }

  res.send(user);
};
