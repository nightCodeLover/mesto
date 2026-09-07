import type { Request, Response } from "express";
import { MongoClient, ObjectId } from "mongodb";
import { UserModel, USERS_COLLECTION_NAME } from "../models";
import type { RequestWithUser } from "../app";
import { checkUserInDb } from "./helpers";
import { userErrors } from "./errors";
import { UpdateUserAvatar, UpdateUserModel } from "./types";

export const createGetUsersController = (client: MongoClient) => async (
  req: Request,
  res: Response,
) => {
  const users = await client
    .db()
    .collection<UserModel>(USERS_COLLECTION_NAME)
    .find({})
    .toArray();

  res.send(users);
};

export const createGetUserByIdController = (client: MongoClient) => async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;

  const user = await checkUserInDb({ res, client, id });

  if (!user) return;

  res.send(user);
};

export const createCreateUserController = (client: MongoClient) => async (
  req: Request<Record<string, never>, unknown, UserModel>,
  res: Response,
) => {
  const { name, avatar, about } = req.body;

  await client
    .db()
    .collection<UserModel>(USERS_COLLECTION_NAME)
    .insertOne({ name, avatar, about });

  res.send({});
};

export const createUpdateUserController = (client: MongoClient) => async (
  req: Request<Record<string, unknown>, unknown, UpdateUserModel>,
  res: Response,
) => {
  const authenticatedRequest = req as typeof req & RequestWithUser;

  const id = authenticatedRequest.user._id;

  const { name, avatar, about } = req.body;

  const updates: UpdateUserModel = {};

  if (name) updates.name = name;
  if (avatar) updates.avatar = avatar;
  if (about) updates.about = about;

  const updateResult = await client
    .db()
    .collection<UserModel>(USERS_COLLECTION_NAME)
    .updateOne({ _id: new ObjectId(id) }, { $set: updates });

  if (updateResult.matchedCount === 0) {
    const { code, message } = userErrors.noUser;

    res.status(code).send({ message });
  } else {
    res.send({});
  }
};

export const createUpdateUsersAvatarController = (client: MongoClient) => async (
  req: Request<Record<string, unknown>, unknown, UpdateUserAvatar>,
  res: Response,
) => {
  const authenticatedRequest = req as typeof req & RequestWithUser;

  const id = authenticatedRequest.user._id;

  const { avatar } = req.body;

  const updateResult = await client
    .db()
    .collection<UserModel>(USERS_COLLECTION_NAME)
    .updateOne({ _id: new ObjectId(id) }, { $set: { avatar } });

  if (updateResult.matchedCount === 0) {
    res.status(404).send({ error: "User not found" });
  } else {
    res.send({});
  }
};
