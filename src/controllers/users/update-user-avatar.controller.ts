import type { Request, Response } from "express";
import mongoose from "mongoose";
import type { RequestWithUser } from "../../app";
import { User } from "../../models";
import { userErrors } from "../../errors";

export type UpdateUserAvatar = {
  avatar: string;
};

export const updateUsersAvatarController = async (
  req: Request<Record<string, unknown>, unknown, UpdateUserAvatar>,
  res: Response,
) => {
  try {
    const authenticatedRequest = req as typeof req & RequestWithUser;

    const id = authenticatedRequest.user._id;

    const { avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!user) {
      const { code, message } = userErrors.noUser;

      res.status(code).send({ message });
    } else {
      res.send(user);
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const { message, code } = userErrors.incorrectPatchAvatarData;

      res.status(code).send({ message });
      return;
    }

    throw error;
  }
};
