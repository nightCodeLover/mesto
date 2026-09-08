import type { Request, Response } from "express";
import mongoose from "mongoose";
import { CREATED_STATUS_CODE } from "../constants";
import { Card, CardModel } from "../models";
import {
  createCard,
  getMockOwner,
  dislikeCard,
  likeCard,
  isCorrectId,
} from "./helpers";
import { cardsErrors } from "./errors";

export const getCardsController = async (req: Request, res: Response) => {
  const cards = await Card.find({});

  res.send(cards);
};

export const postCardController = async (
  req: Request<Record<string, never>, unknown, CardModel>,
  res: Response,
) => {
  const { link, name } = req.body;

  const mockOwner = getMockOwner(req);

  try {
    await createCard({
      name,
      link,
      ownerId: mockOwner,
    });

    res.status(CREATED_STATUS_CODE).send({});
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const { message, code } = cardsErrors.incorrectPostData;

      res.status(code).send({ message });

      return;
    }

    throw error;
  }
};

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

export const deleteLikeFromCardController = async (
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

  const card = await Card.findById(cardId);

  if (!card) {
    const { code, message } = cardsErrors.noCard;

    res.status(code).send({ message });

    return;
  }

  const mockOwner = getMockOwner(req);
  try {
    const updatedCard = await dislikeCard({
      cardId,
      userId: mockOwner,
    });

    if (!updatedCard) {
      const { message, code } = cardsErrors.incorrectDeleteLike;

      res.status(code).send({
        message,
      });

      return;
    }

    res.send(updatedCard);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const { message, code } = cardsErrors.incorrectDeleteLike;

      res.status(code).send({ message });
      return;
    }

    throw error;
  }
};

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
