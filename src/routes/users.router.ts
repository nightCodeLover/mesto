import { Router } from "express";
import {
  createGetUserByIdController,
  createGetUsersController,
  createPostUserController,
} from "../controllers";
import { MongoClient } from "mongodb";
import { USERS_ROUTE } from "./constants";

const createGetUsersRouter = (client: MongoClient) => {
  const router = Router();

  const controller = createGetUsersController(client);

  router.get(USERS_ROUTE, controller);

  return router;
};

const createGetUserByIdRouter = (client: MongoClient) => {
  const router = Router();

  const controller = createGetUserByIdController(client);

  router.get(`${USERS_ROUTE}/:id`, controller);

  return router;
};

const createPostUserRouter = (client: MongoClient) => {
  const router = Router();

  const controller = createPostUserController(client);

  router.post(USERS_ROUTE, controller);

  return router;
};

export const createUsersRouter = (client: MongoClient) => {
  const router = Router();

  const getUsersRouter = createGetUsersRouter(client);
  const getUserByIdRouter = createGetUserByIdRouter(client);
  const postUserRouter = createPostUserRouter(client);

  router.use(getUsersRouter);
  router.use(getUserByIdRouter);
  router.use(postUserRouter);

  return router;
};
