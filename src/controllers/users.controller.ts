import type { Request, Response } from "express";
import mongoose from "mongoose";
import { User, UserModel } from "../models";
import type { RequestWithUser } from "../app";
import { isCorrectId } from "./helpers";
import { userErrors } from "./errors";
import { UpdateUserAvatar, UpdateUserModel } from "./types";

export const getUsersController = async (req: Request, res: Response) => {
  const users = await User.find({});

  res.send(users);
};

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

export const createUserController = async (
  req: Request<Record<string, never>, unknown, UserModel>,
  res: Response,
) => {
  const { name, avatar, about } = req.body;

  try {
    await User.create({ name, avatar, about });

    res.status(201).send({});
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const { code, message } = userErrors.incorrectPostData;

      res.status(code).send({ message });
      return;
    }

    throw error;
  }
};

export const updateUserController = async (
  req: Request<Record<string, unknown>, unknown, UpdateUserModel>,
  res: Response,
) => {
  try {
    const authenticatedRequest = req as typeof req & RequestWithUser;

    const id = authenticatedRequest.user._id;

    const { name, avatar, about } = req.body;

    const updates: UpdateUserModel = {};

    if (name) updates.name = name;
    if (avatar) updates.avatar = avatar;
    if (about) updates.about = about;

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
      res.send({});
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
