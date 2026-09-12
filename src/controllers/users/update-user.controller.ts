import type { Request, Response } from "express";
import mongoose from "mongoose";
import { User, UserModel } from "../../models";
import {
  BadRequestError,
  noAuthError,
  NotAuthorizedError,
  NotFoundError,
  userErrors,
} from "../../errors";

export type UpdateUserModel = Partial<UserModel>;

export const updateUserController = async (
  req: Request<Record<string, unknown>, unknown, UpdateUserModel>,
  res: Response,
) => {
  try {
    const id = req.user?._id;

    if (!id) {
      throw new NotAuthorizedError(noAuthError.message);
    }

    const { name, avatar, about } = req.body;

    const updates: UpdateUserModel = {};

    if (name && name.length) updates.name = name;
    if (avatar && avatar.length) updates.avatar = avatar;
    if (about && about.length) updates.about = about;

    if (!Object.keys(updates).length) {
      throw new BadRequestError(userErrors.incorrectPatchUserData.message);
    }

    const user = await User.findByIdAndUpdate(
      id,
      { $set: updates },
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
      throw new BadRequestError(userErrors.incorrectPatchUserData.message);
    }

    throw error;
  }
};
