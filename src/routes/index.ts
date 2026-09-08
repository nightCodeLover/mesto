import { Router } from "express";
import { createUsersRouter } from "./users.router";
import { createCardsRouter } from "./cards.router";
import { CARDS_ROUTE, USERS_ROUTE } from "./constants";
import {
  internalErrorMiddleware,
  unknownPathErrorMiddleware,
} from "./error.middleware";

export const createAppRouter = () => {
  const appRouter = Router();

  const usersRouter = createUsersRouter();
  const cardsRouter = createCardsRouter();

  appRouter.use(USERS_ROUTE, usersRouter);
  appRouter.use(CARDS_ROUTE, cardsRouter);

  appRouter.use(unknownPathErrorMiddleware);
  appRouter.use(internalErrorMiddleware);

  return appRouter;
};

export { USERS_ROUTE, CARDS_ROUTE } from "./constants";
