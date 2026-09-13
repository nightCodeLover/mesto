import type { Request, Response } from "express";
import mongoose from "mongoose";
import { Card } from "../../models";
import {
  BadRequestError,
  cardsErrors,
  noAuthErrorMessage,
  NotAuthorizedError,
  NotFoundError,
} from "../../errors";
import { isCorrectId, likeCard } from "../helpers";

export const putCardLikesController = async (
  req: Request<{ cardId: string }>,
  res: Response,
) => {
  const { cardId } = req.params;

  const isCorrectCardId = isCorrectId(cardId);

  if (!isCorrectCardId) {
    throw new BadRequestError(cardsErrors.incorrectIdMessage);
  }

  const userId = req.user?._id;

  if (!userId) {
    throw new NotAuthorizedError(noAuthErrorMessage);
  }

  const card = await Card.findById(cardId);

  if (!card) {
    throw new NotFoundError(cardsErrors.noCardMessage);
  }

  try {
    const updatedCard = await likeCard({ cardId, userId });

    if (!updatedCard) {
      throw new BadRequestError(cardsErrors.incorrectPutLikeMessage);
    }

    res.send(updatedCard);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      throw new BadRequestError(cardsErrors.incorrectPutLikeMessage);
    }

    throw error;
  }
};
