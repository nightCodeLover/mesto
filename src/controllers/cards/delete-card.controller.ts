import type { Request, Response } from "express";
import { Card } from "../../models";
import {
  BadRequestError, cardsErrors, NotFoundError, userErrors,
} from "../../errors";
import { isCorrectId } from "../helpers";

export const deleteCardController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id: cardId } = req.params;

  const isCorrectCardId = isCorrectId(cardId);

  if (!isCorrectCardId) {
    throw new BadRequestError(cardsErrors.incorrectId.message);
  }

  const card = await Card.findById(cardId);

  if (!card) {
    throw new NotFoundError(cardsErrors.noCard.message);
  }

  if (String(card?.owner) === req.user?._id) {
    const deletedCard = await Card.deleteOne({ _id: cardId });

    res.send(deletedCard);

    return;
  }

  throw new BadRequestError(userErrors.incorrectDeleteCardRights.message);
};
