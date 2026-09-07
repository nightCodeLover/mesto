import { MongoClient } from "mongodb";
import { Router } from "express";
import { createUsersRouter } from "./users.router";
import { createCardsRouter } from "./cards.router";
import { CARDS_ROUTE, USERS_ROUTE } from "./constants";

export const createAppRouter = (client: MongoClient) => {
  const appRouter = Router();

  const usersRouter = createUsersRouter(client);
  const cardsRouter = createCardsRouter(client);

  appRouter.use(USERS_ROUTE, usersRouter);
  appRouter.use(CARDS_ROUTE, cardsRouter);

  return appRouter;
};

export { USERS_ROUTE, CARDS_ROUTE } from "./constants";
