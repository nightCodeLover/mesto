import type { Request, Response } from "express";
import { Card } from "../../models";
import { cardsErrors, userErrors } from "../../errors";
import { isCorrectId } from "../helpers";

export const deleteCardController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id: cardId } = req.params;

  const isCorrectCardId = isCorrectId(cardId);

  if (!isCorrectCardId) {
    const { message, code } = cardsErrors.incorrectId;

    res.status(code).send({ message });

    return;
  }

  const card = await Card.findById({ _id: cardId });

  if (!card) {
    const { message, code } = cardsErrors.noCard;

    res.status(code).send({ message });

    return;
  }

  if (String(card?.owner) === req.user?._id) {
    const deletedCard = await Card.deleteOne({ _id: cardId });

    res.send(deletedCard);

    return;
  }

  const { message, code } = userErrors.incorrectDeleteCardRights;

  res.status(code).send({ message });
};
