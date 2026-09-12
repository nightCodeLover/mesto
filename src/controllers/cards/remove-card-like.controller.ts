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
import { dislikeCard, isCorrectId } from "../helpers";

export const deleteLikeFromCardController = async (
  req: Request<{ cardId: string }>,
  res: Response,
) => {
  const { cardId } = req.params;

  const isCorrectCardId = isCorrectId(cardId);

  if (!isCorrectCardId) {
    throw new BadRequestError(cardsErrors.incorrectId.message);
  }

  const card = await Card.findById(cardId);

  if (!card) {
    throw new NotFoundError(cardsErrors.noCard.message);
  }

  const userId = req.user?._id;

  if (!userId) {
    throw new NotAuthorizedError(noAuthError.message);
  }

  try {
    const updatedCard = await dislikeCard({
      cardId,
      userId,
    });

    if (!updatedCard) {
      throw new BadRequestError(cardsErrors.incorrectDeleteLike.message);
    }

    res.send(updatedCard);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      throw new BadRequestError(cardsErrors.incorrectDeleteLike.message);
    }

    throw error;
  }
};
