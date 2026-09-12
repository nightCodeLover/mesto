import { Express, Router } from "express";
import { createUsersRouter } from "./users.router";
import { createCardsRouter } from "./cards.router";
import { CARDS_ROUTE, USERS_ROUTE } from "./constants";

import { createAuthRouter } from "./auth.router";
import { authMiddleware } from "../middlewares";

export const createAppRouter = (app: Express) => {
  const appRouter = Router();

  const authRouter = createAuthRouter();

  app.use("", authRouter);

  app.use(authMiddleware);

  const usersRouter = createUsersRouter();
  const cardsRouter = createCardsRouter();

  appRouter.use(USERS_ROUTE, usersRouter);
  appRouter.use(CARDS_ROUTE, cardsRouter);

  return appRouter;
};

export { USERS_ROUTE, CARDS_ROUTE } from "./constants";
