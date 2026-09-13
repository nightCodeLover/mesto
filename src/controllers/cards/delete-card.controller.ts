import type { Request, Response } from "express";
import { Card } from "../../models";
import {
  BadRequestError,
  cardsErrors,
  ForbiddenError,
  NotFoundError,
  userErrors,
} from "../../errors";
import { isCorrectId } from "../helpers";

export const deleteCardController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id: cardId } = req.params;

  const isCorrectCardId = isCorrectId(cardId);

  if (!isCorrectCardId) {
    throw new BadRequestError(cardsErrors.incorrectIdMessage);
  }

  const card = await Card.findById(cardId);

  if (!card) {
    throw new NotFoundError(cardsErrors.noCardMessage);
  }

  if (String(card?.owner) === req.user?._id) {
    const deletedCard = await Card.deleteOne({ _id: cardId });

    res.send(deletedCard);

    return;
  }

  throw new ForbiddenError(userErrors.incorrectDeleteCardRightsMessage);
};
