import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import {
  getMeController,
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

  router.get(
    "/:id",
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().hex().length(24).required(),
      }),
    }),
    getUserByIdController,
  );

  return router;
};

const createUpdateUserRouter = () => {
  const router = Router();

  router.patch(
    "/me",
    celebrate({
      [Segments.BODY]: Joi.object()
        .keys({
          name: Joi.string().min(2).max(30),
          about: Joi.string().min(2).max(30),
          avatar: Joi.string().uri(),
        })
        .min(1),
    }),
    updateUserController,
  );

  return router;
};

const createUpdateUserAvatarRouter = () => {
  const router = Router();

  router.patch(
    "/me/avatar",
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        avatar: Joi.string().uri().required(),
      }),
    }),
    updateUsersAvatarController,
  );

  return router;
};

const createGetMeRouter = () => {
  const router = Router();

  router.get("/me", getMeController);

  return router;
};

export const createUsersRouter = () => {
  const router = Router();

  const getUsersRouter = createGetUsersRouter();
  const getUserByIdRouter = createGetUserByIdRouter();
  const updateUserRouter = createUpdateUserRouter();
  const updateUserAvatarRouter = createUpdateUserAvatarRouter();
  const getMeRouter = createGetMeRouter();

  router.use(getUsersRouter);
  router.use(updateUserRouter);
  router.use(updateUserAvatarRouter);
  router.use(getMeRouter);
  router.use(getUserByIdRouter);

  return router;
};
