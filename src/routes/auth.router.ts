import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { createUserController, loginController } from "../controllers";

const createLoginRouter = () => {
  const router = Router();

  router.post(
    "/signin",
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }),
    }),
    loginController,
  );

  return router;
};

const createRegisterRouter = () => {
  const router = Router();

  router.post(
    "/signup",
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
        avatar: Joi.string().uri(),
      }),
    }),
    createUserController,
  );

  return router;
};

export const createAuthRouter = () => {
  const router = Router();

  const loginRouter = createLoginRouter();
  const registerRouter = createRegisterRouter();

  router.use(loginRouter);
  router.use(registerRouter);

  return router;
};
