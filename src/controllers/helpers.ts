import { MongoClient, ObjectId } from "mongodb";
import type { Response, Request } from "express";
import {
  CardModel,
  CARDS_COLLECTION_NAME,
  UserModel,
  USERS_COLLECTION_NAME,
} from "../models";
import type { RequestWithUser } from "../app";
import { cardsErrors, userErrors } from "./errors";

export const likeCard = ({
  cardId,
  userId,
  client,
}: {
  client: MongoClient;
  cardId: string;
  userId: string;
}) => client
  .db()
  .collection<CardModel>(CARDS_COLLECTION_NAME)
  .updateOne({ _id: new ObjectId(cardId) }, { $addToSet: { likes: userId } });

export const dislikeCard = async ({
  cardId,
  userId,
  client,
}: {
  client: MongoClient;
  cardId: string;
  userId: string;
}) => client
  .db()
  .collection<CardModel>(CARDS_COLLECTION_NAME)
  .updateOne({ _id: new ObjectId(cardId) }, { $pull: { likes: userId } });

export const createCard = async ({
  link,
  client,
  name,
  ownerId,
}: {
  client: MongoClient;
  link: string;
  name: string;
  ownerId: string;
}) => {
  const createdAt = new Date();

  await client
    .db()
    .collection<CardModel>(CARDS_COLLECTION_NAME)
    .insertOne({
      createdAt, link, name, owner: ownerId, likes: [],
    });
};

export const getMockOwner = (req: Request) => {
  const authenticatedRequest = req as typeof req & RequestWithUser;

  return authenticatedRequest.user._id;
};

export const checkCardInDb = async ({
  cardId,
  client,
  res,
}: {
  cardId: string;
  client: MongoClient;
  res: Response;
}) => {
  const card = await client
    .db()
    .collection<CardModel>(CARDS_COLLECTION_NAME)
    .findOne({ _id: new ObjectId(cardId) });

  if (!card) {
    const { code, message } = cardsErrors.noCard;

    res.status(code).send({ message });
  }

  return card;
};

export const checkUserInDb = async ({
  id,
  client,
  res,
}: {
  client: MongoClient;
  id: string;
  res: Response;
}) => {
  const user = await client
    .db()
    .collection<UserModel>(USERS_COLLECTION_NAME)
    .findOne({ _id: new ObjectId(id) });

  if (!user) {
    const { code, message } = userErrors.noUser;

    res.status(code).send({ message });
  }

  return user;
};
