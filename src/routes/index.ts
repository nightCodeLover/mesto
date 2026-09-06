import { createUsersRouter } from "./users.router";
import { MongoClient } from "mongodb";
import { Router } from "express";
import { createCardsRouter } from "./cards.router";

export const createAppRouter = (client: MongoClient) => {
  const appRouter = Router();

  const usersRouter = createUsersRouter(client);
  const cardsRouter = createCardsRouter(client);

  appRouter.use("/", usersRouter);
  appRouter.use("/", cardsRouter);

  return appRouter;
};

export { USERS_ROUTE, CARDS_ROUTE } from "./constants";
