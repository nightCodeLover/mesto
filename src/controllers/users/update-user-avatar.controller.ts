import type { Request, Response } from "express";
import mongoose from "mongoose";
import { User } from "../../models";
import {
  BadRequestError,
  noAuthError,
  NotAuthorizedError,
  NotFoundError,
  userErrors,
} from "../../errors";

export type UpdateUserAvatar = {
  avatar: string;
};

export const updateUsersAvatarController = async (
  req: Request<Record<string, unknown>, unknown, UpdateUserAvatar>,
  res: Response,
) => {
  try {
    const id = req.user?._id;

    if (!id) {
      throw new NotAuthorizedError(noAuthError.message);
    }

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
      throw new NotFoundError(userErrors.noUser.message);
    }

    res.send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      throw new BadRequestError(userErrors.incorrectPatchAvatarData.message);
    }

    throw error;
  }
};
