import type { Request, Response } from "express";
import { MongoClient, ObjectId } from "mongodb";
import { CARDS_ROUTE } from "../routes";
import { CardModel, UserModel } from "../models";
import type { RequestWithUser } from "../app";

export const createGetCardsController = (client: MongoClient) => {
  return async (req: Request, res: Response) => {
    const cards = await client
      .db()
      .collection<CardModel>(CARDS_ROUTE)
      .find({})
      .toArray();

    res.send(cards);
  };
};

export const createGetCardByIdController = (client: MongoClient) => {
  return async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    const card = await client
      .db()
      .collection<CardModel>(CARDS_ROUTE)
      .findOne({ _id: new ObjectId(id) });

    if (!card) {
      res.status(404).send({});
    }

    res.send(card);
  };
};

export const createPostCardController = (client: MongoClient) => {
  return async (
    req: Request<Record<string, never>, unknown, CardModel>,
    res: Response,
  ) => {
    const { createdAt, link, name, owner, likes } = req.body;

    const authenticatedRequest = req as typeof req & RequestWithUser;

    const mockOwner = authenticatedRequest.user._id;

    await client
      .db()
      .collection<CardModel>(CARDS_ROUTE)
      .insertOne({ createdAt, link, name, owner: mockOwner, likes });

    res.send({});
  };
};
