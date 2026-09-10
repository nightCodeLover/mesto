import type { Request, Response } from "express";
import { User } from "../../models";
import { userErrors } from "../errors";
import { isCorrectId } from "../helpers";

export const getUserByIdController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;

  const isCorrectUserId = isCorrectId(id);

  if (!isCorrectUserId) {
    const { message, code } = userErrors.incorrectId;

    res.status(code).send({ message });

    return;
  }

  const user = await User.findById(id);

  if (!user) {
    const { code, message } = userErrors.noUser;

    res.status(code).send({ message });

    return;
  }

  res.send(user);
};
