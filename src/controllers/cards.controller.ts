import type { Request, Response } from "express";
import { MongoClient, ObjectId } from "mongodb";
import { CardModel, CARDS_COLLECTION_NAME } from "../models";
import {
  checkCardInDb,
  createCard,
  getMockOwner,
  dislikeCard,
  likeCard,
} from "./helpers";
import { cardsErrors } from "./errors";

export const createGetCardsController = (client: MongoClient) => async (
  req: Request,
  res: Response,
) => {
  const cards = await client
    .db()
    .collection<CardModel>(CARDS_COLLECTION_NAME)
    .find({})
    .toArray();

  res.send(cards);
};

export const createPostCardController = (client: MongoClient) => async (
  req: Request<Record<string, never>, unknown, CardModel>,
  res: Response,
) => {
  const { link, name } = req.body;

  const mockOwner = getMockOwner(req);

  await createCard({
    name, link, client, ownerId: mockOwner,
  });

  res.send({});
};

export const createPutCardLikesController = (client: MongoClient) => async (
  req: Request<{ cardId: string }>,
  res: Response,
) => {
  const { cardId } = req.params;

  const mockOwner = getMockOwner(req);

  const card = await checkCardInDb({ cardId, res, client });

  if (!card) return;

  const updateResult = await likeCard({ client, cardId, userId: mockOwner });

  if (updateResult.modifiedCount === 0) {
    const { message, code } = cardsErrors.incorrectPutLike;

    res.status(code).send({
      message,
    });

    return;
  }

  res.send({});
};

export const createDeleteLikeFromCardController = (client: MongoClient) => async (
  req: Request<{ cardId: string }>,
  res: Response,
) => {
  const { cardId } = req.params;

  const card = await checkCardInDb({ cardId, res, client });

  if (!card) return;

  const mockOwner = getMockOwner(req);

  const updateResult = await dislikeCard({
    cardId,
    client,
    userId: mockOwner,
  });

  if (updateResult.modifiedCount === 0) {
    const { message, code } = cardsErrors.incorrectDeleteLike;

    res.status(code).send({
      message,
    });

    return;
  }

  res.send({});
};

export const createDeleteCardController = (client: MongoClient) => async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;

  await client
    .db()
    .collection<CardModel>(CARDS_COLLECTION_NAME)
    .deleteOne({ _id: new ObjectId(id) });

  res.send({});
};
