import { MongoClient } from "mongodb";
import { Router } from "express";
import {
  createGetCardByIdController,
  createGetCardsController,
  createPostCardController,
} from "../controllers";
import { CARDS_ROUTE } from "./constants";

const createGetCardsRouter = (client: MongoClient) => {
  const router = Router();

  const controller = createGetCardsController(client);

  router.get(CARDS_ROUTE, controller);

  return router;
};

const createGetCardByIdRouter = (client: MongoClient) => {
  const router = Router();

  const controller = createGetCardByIdController(client);

  router.get(`${CARDS_ROUTE}:id`, controller);

  return router;
};

const createPostCardRouter = (client: MongoClient) => {
  const router = Router();

  const controller = createPostCardController(client);

  router.post(CARDS_ROUTE, controller);

  return router;
};

export const createCardsRouter = (client: MongoClient) => {
  const router = Router();

  const getCardsRouter = createGetCardsRouter(client);
  const getCardByIdRouter = createGetCardByIdRouter(client);
  const postCardRouter = createPostCardRouter(client);

  router.use(getCardsRouter);
  router.use(getCardByIdRouter);
  router.use(postCardRouter);

  return router;
};
