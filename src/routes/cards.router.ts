import { MongoClient } from "mongodb";
import { Router } from "express";
import {
  createDeleteCardController,
  createGetCardsController,
  createPostCardController,
  createPutCardLikesController,
  createDeleteLikeFromCardController,
} from "../controllers";

const createGetCardsRouter = (client: MongoClient) => {
  const router = Router();

  const controller = createGetCardsController(client);

  router.get("/", controller);

  return router;
};

const createPostCardRouter = (client: MongoClient) => {
  const router = Router();

  const controller = createPostCardController(client);

  router.post("/", controller);

  return router;
};

const createDeleteCardRouter = (client: MongoClient) => {
  const router = Router();

  const controller = createDeleteCardController(client);

  router.delete(`/:id`, controller);

  return router;
};

const createPutLikeOnCardRouter = (client: MongoClient) => {
  const router = Router();

  const controller = createPutCardLikesController(client);

  router.put(`/:cardId/likes`, controller);

  return router;
};

const createDeleteLikeFromCardRouter = (client: MongoClient) => {
  const router = Router();

  const controller = createDeleteLikeFromCardController(client);

  router.delete(`/:cardId/likes`, controller);

  return router;
};

export const createCardsRouter = (client: MongoClient) => {
  const router = Router();

  const getCardsRouter = createGetCardsRouter(client);
  const postCardRouter = createPostCardRouter(client);
  const deleteCardRouter = createDeleteCardRouter(client);
  const putLikeOnCardRouter = createPutLikeOnCardRouter(client);
  const deleteLikeFromCardRouter = createDeleteLikeFromCardRouter(client);

  router.use(getCardsRouter);
  router.use(postCardRouter);
  router.use(deleteCardRouter);
  router.use(putLikeOnCardRouter);
  router.use(deleteLikeFromCardRouter);

  return router;
};
