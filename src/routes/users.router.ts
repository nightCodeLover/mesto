import { Router } from "express";
import {
  getUserByIdController,
  getUsersController,
  updateUserController,
  updateUsersAvatarController,
} from "../controllers";

const createGetUsersRouter = () => {
  const router = Router();

  router.get("/", getUsersController);

  return router;
};

const createGetUserByIdRouter = () => {
  const router = Router();

  router.get("/:id", getUserByIdController);

  return router;
};

const createUpdateUserRouter = () => {
  const router = Router();

  router.patch("/me", updateUserController);

  return router;
};

const createUpdateUserAvatarRouter = () => {
  const router = Router();

  router.patch("/me/avatar", updateUsersAvatarController);

  return router;
};

export const createUsersRouter = () => {
  const router = Router();

  const getUsersRouter = createGetUsersRouter();
  const getUserByIdRouter = createGetUserByIdRouter();
  const updateUserRouter = createUpdateUserRouter();
  const updateUserAvatarRouter = createUpdateUserAvatarRouter();

  router.use(getUsersRouter);
  router.use(getUserByIdRouter);
  router.use(updateUserRouter);
  router.use(updateUserAvatarRouter);

  return router;
};
