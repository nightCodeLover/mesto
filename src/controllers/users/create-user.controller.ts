import type { Request, Response } from "express";
import mongoose from "mongoose";
import { CREATED_STATUS_CODE } from "../../constants";
import { User, UserModel } from "../../models";
import { userErrors } from "../errors";

export const createUserController = async (
  req: Request<Record<string, never>, unknown, UserModel>,
  res: Response,
) => {
  const {
    name, avatar, about, password, email,
  } = req.body;

  try {
    await User.create({
      name, avatar, about, password, email,
    });

    res.status(CREATED_STATUS_CODE).send({});
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const { code, message } = userErrors.incorrectPostData;

      res.status(code).send({ message });
      return;
    }

    throw error;
  }
};
