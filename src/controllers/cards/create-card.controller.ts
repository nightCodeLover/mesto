import type { Request, Response } from "express";
import mongoose from "mongoose";
import { CREATED_STATUS_CODE } from "../../constants";
import { Card, CardModel } from "../../models";
import {
  BadRequestError,
  cardsErrors,
  noAuthError,
  NotAuthorizedError,
} from "../../errors";

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
    const createdCard = await Card.create({
      name,
      link,
      owner: ownerId,
    });

    res.status(CREATED_STATUS_CODE).send(createdCard);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      throw new BadRequestError(cardsErrors.incorrectPostData.message);
    }

    throw error;
  }
};
