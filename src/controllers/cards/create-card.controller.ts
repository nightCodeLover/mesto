import type { Request, Response } from "express";
import mongoose from "mongoose";
import { CREATED_STATUS_CODE } from "../../constants";
import type { CardModel } from "../../models";
import {
  BadRequestError, cardsErrors, noAuthError, NotAuthorizedError,
} from "../../errors";
import { createCard } from "../helpers";

export const postCardController = async (
  req: Request<Record<string, never>, unknown, CardModel>,
  res: Response,
) => {
  const { link, name } = req.body;

  const ownerId = req.user?._id;

  if (!ownerId) {
    throw new NotAuthorizedError(noAuthError.message);
  }

  try {
    await createCard({
      name,
      link,
      ownerId,
    });

    res.status(CREATED_STATUS_CODE).send({});
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      throw new BadRequestError(cardsErrors.incorrectPostData.message);
    }

    throw error;
  }
};
