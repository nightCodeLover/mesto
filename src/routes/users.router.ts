import { Router } from "express";
import {
  createGetUserByIdController,
  createGetUsersController,
  createCreateUserController,
  createUpdateUserController,
  createUpdateUsersAvatarController,
} from "../controllers";
import { MongoClient } from "mongodb";
import { validateUser, validateUpdateUserAvatar } from "../models";

const createGetUsersRouter = (client: MongoClient) => {
  const router = Router();

  const controller = createGetUsersController(client);

  router.get("/", controller);

  return router;
};

const createGetUserByIdRouter = (client: MongoClient) => {
  const router = Router();

  const controller = createGetUserByIdController(client);

  router.get(`/:id`, controller);

  return router;
};

const createPostUserRouter = (client: MongoClient) => {
  const router = Router();

  const controller = createCreateUserController(client);

  router.post("/", validateUser, controller);

  return router;
};

const createUpdateUserRouter = (client: MongoClient) => {
  const router = Router();

  const controller = createUpdateUserController(client);

  router.patch("/me", validateUser, controller);

  return router;
};

const createUpdateUserAvatarRouter = (client: MongoClient) => {
  const router = Router();

  const controller = createUpdateUsersAvatarController(client);

  router.patch("/me/avatar", validateUpdateUserAvatar, controller);

  return router;
};

export const createUsersRouter = (client: MongoClient) => {
  const router = Router();

  const getUsersRouter = createGetUsersRouter(client);
  const getUserByIdRouter = createGetUserByIdRouter(client);
  const postUserRouter = createPostUserRouter(client);
  const updateUserRouter = createUpdateUserRouter(client);
  const updateUserAvatarRouter = createUpdateUserAvatarRouter(client);

  router.use(getUsersRouter);
  router.use(getUserByIdRouter);
  router.use(postUserRouter);
  router.use(updateUserRouter);
  router.use(updateUserAvatarRouter);

  return router;
};
