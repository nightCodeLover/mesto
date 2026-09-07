import type { Request, Response } from "express";
import mongoose from "mongoose";
import { Card, CardModel } from "../models";
import {
  checkCardInDb,
  createCard,
  getMockOwner,
  dislikeCard,
  likeCard,
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

    res.send({});
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

  const mockOwner = getMockOwner(req);

  const card = await checkCardInDb({ cardId, res });

  if (!card) return;

  try {
    const updatedCard = await likeCard({ cardId, userId: mockOwner });

    if (!updatedCard) {
      const { message, code } = cardsErrors.incorrectPutLike;

      res.status(code).send({
        message,
      });

      return;
    }

    res.send({});
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

  const card = await checkCardInDb({ cardId, res });

  if (!card) return;

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

    res.send({});
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

  const card = await Card.findByIdAndDelete(id);

  if (!card) {
    const { message, code } = cardsErrors.noCard;

    res.status(code).send({ message });

    return;
  }

  res.send({});
};
