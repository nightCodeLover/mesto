import type { Request, Response } from "express";
import { Card } from "../../models";
import { cardsErrors } from "../../errors";
import { isCorrectId } from "../helpers";

export const deleteCardController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;

  const isCorrectCardId = isCorrectId(id);

  if (!isCorrectCardId) {
    const { message, code } = cardsErrors.incorrectId;

    res.status(code).send({ message });

    return;
  }

  const card = await Card.findByIdAndDelete(id);

  if (!card) {
    const { message, code } = cardsErrors.noCard;

    res.status(code).send({ message });

    return;
  }

  res.send({});
};
