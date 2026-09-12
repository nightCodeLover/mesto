import type { Request, Response } from "express";
import mongoose from "mongoose";
import { Card } from "../../models";
import {
  BadRequestError,
  cardsErrors,
  noAuthError,
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
    throw new BadRequestError(cardsErrors.incorrectId.message);
  }

  const userId = req.user?._id;

  if (!userId) {
    throw new NotAuthorizedError(noAuthError.message);
  }

  const card = await Card.findById(cardId);

  if (!card) {
    throw new NotFoundError(cardsErrors.noCard.message);
  }

  try {
    const updatedCard = await likeCard({ cardId, userId });

    if (!updatedCard) {
      throw new BadRequestError(cardsErrors.incorrectPutLike.message);
    }

    res.send(updatedCard);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      throw new BadRequestError(cardsErrors.incorrectPutLike.message);
    }

    throw error;
  }
};
