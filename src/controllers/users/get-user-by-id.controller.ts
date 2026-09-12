import type { Request, Response } from "express";
import { User } from "../../models";
import {
  BadRequestError, NotFoundError, userErrors,
} from "../../errors";
import { isCorrectId } from "../helpers";

export const getUserByIdController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;

  const isCorrectUserId = isCorrectId(id);

  if (!isCorrectUserId) {
    throw new BadRequestError(userErrors.incorrectId.message);
  }

  const user = await User.findById(id);

  if (!user) {
    throw new NotFoundError(userErrors.noUser.message);
  }

  res.send(user);
};
