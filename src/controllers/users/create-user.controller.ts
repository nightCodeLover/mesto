import type { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { CREATED_STATUS_CODE } from "../../constants";
import { User, UserModel } from "../../models";
import { BadRequestError, ConflictError, userErrors } from "../../errors";

const SALT_LENGTH = 16;

const USER_EXIST_CODE = 11000;

export const createUserController = async (
  req: Request<Record<string, never>, unknown, UserModel>,
  res: Response,
) => {
  const {
    name, avatar, about, password, email,
  } = req.body;

  try {
    const hashPas = await bcrypt.hash(password, SALT_LENGTH);

    const createdUser = await User.create({
      name,
      avatar,
      about,
      password: hashPas,
      email,
    });

    res.status(CREATED_STATUS_CODE).send({
      name: createdUser.name,
      avatar: createdUser.avatar,
      about: createdUser.about,
      email: createdUser.email,
    });
  } catch (error) {
    if (
      error instanceof mongoose.mongo.MongoServerError
      && error.code === USER_EXIST_CODE
    ) {
      throw new ConflictError(userErrors.userExistMessage);
    }

    if (error instanceof mongoose.Error.ValidationError) {
      throw new BadRequestError(userErrors.incorrectPostDataMessage);
    }

    throw error;
  }
};
