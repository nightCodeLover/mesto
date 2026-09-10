import type { Request, Response } from "express";
import mongoose from "mongoose";
import { Card } from "../../models";
import { cardsErrors } from "../errors";
import { getMockOwner, isCorrectId, likeCard } from "../helpers";

export const putCardLikesController = async (
  req: Request<{ cardId: string }>,
  res: Response,
) => {
  const { cardId } = req.params;

  const isCorrectCardId = isCorrectId(cardId);

  if (!isCorrectCardId) {
    const { message, code } = cardsErrors.incorrectId;

    res.status(code).send({ message });

    return;
  }

  const mockOwner = getMockOwner(req);

  const card = await Card.findById(cardId);

  if (!card) {
    const { code, message } = cardsErrors.noCard;

    res.status(code).send({ message });

    return;
  }

  try {
    const updatedCard = await likeCard({ cardId, userId: mockOwner });

    if (!updatedCard) {
      const { message, code } = cardsErrors.incorrectPutLike;

      res.status(code).send({
        message,
      });

      return;
    }

    res.send(updatedCard);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const { message, code } = cardsErrors.incorrectPutLike;

      res.status(code).send({ message });
      return;
    }

    throw error;
  }
};
