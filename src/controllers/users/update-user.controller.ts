import type { Request, Response } from "express";
import mongoose from "mongoose";
import type { RequestWithUser } from "../../app";
import { User, UserModel } from "../../models";
import { userErrors } from "../errors";

export type UpdateUserModel = Partial<UserModel>;

export const updateUserController = async (
  req: Request<Record<string, unknown>, unknown, UpdateUserModel>,
  res: Response,
) => {
  try {
    const authenticatedRequest = req as typeof req & RequestWithUser;

    const id = authenticatedRequest.user._id;

    const { name, avatar, about } = req.body;

    const updates: UpdateUserModel = {};

    if (name && name.length) updates.name = name;
    if (avatar && avatar.length) updates.avatar = avatar;
    if (about && about.length) updates.about = about;

    if (!Object.keys(updates).length) {
      const { code, message } = userErrors.incorrectPatchUserData;

      res.status(code).send({ message });

      return;
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
      const { code, message } = userErrors.noUser;

      res.status(code).send({ message });
      return;
    }

    res.send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const { message, code } = userErrors.incorrectPatchUserData;

      res.status(code).send({
        message,
      });

      return;
    }

    throw error;
  }
};
