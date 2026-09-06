import type { Request, Response } from "express";
import { MongoClient, ObjectId } from "mongodb";
import { UserModel, USERS_COLLECTION_NAME } from "../models";

export const createGetUsersController = (client: MongoClient) => {
  return async (req: Request, res: Response) => {
    const users = await client
      .db()
      .collection<UserModel>(USERS_COLLECTION_NAME)
      .find({})
      .toArray();

    res.send(users);
  };
};

export const createGetUserByIdController = (client: MongoClient) => {
  return async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    const user = await client
      .db()
      .collection<UserModel>(USERS_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      res.status(404).send({});
      return;
    }

    return res.send(user);
  };
};

export const createPostUserController = (client: MongoClient) => {
  return async (
    req: Request<Record<string, never>, unknown, UserModel>,
    res: Response,
  ) => {
    const { name, link, about } = req.body;

    await client
      .db()
      .collection<UserModel>(USERS_COLLECTION_NAME)
      .insertOne({ name, link, about });

    res.send({});
  };
};
