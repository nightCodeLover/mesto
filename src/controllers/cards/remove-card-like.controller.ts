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
import { dislikeCard, isCorrectId } from "../helpers";

export const deleteLikeFromCardController = async (
  req: Request<{ cardId: string }>,
  res: Response,
) => {
  const { cardId } = req.params;

  const isCorrectCardId = isCorrectId(cardId);

  if (!isCorrectCardId) {
    throw new BadRequestError(cardsErrors.incorrectIdMessage);
  }

  const card = await Card.findById(cardId);

  if (!card) {
    throw new NotFoundError(cardsErrors.noCardMessage);
  }

  const userId = req.user?._id;

  if (!userId) {
    throw new NotAuthorizedError(noAuthErrorMessage);
  }

  try {
    const updatedCard = await dislikeCard({
      cardId,
      userId,
    });

    if (!updatedCard) {
      throw new BadRequestError(cardsErrors.incorrectDeleteLikeMessage);
    }

    res.send(updatedCard);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      throw new BadRequestError(cardsErrors.incorrectDeleteLikeMessage);
    }

    throw error;
  }
};
