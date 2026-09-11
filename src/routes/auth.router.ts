import { Router } from "express";
import { createUserController, loginController } from "../controllers";

const createLoginRouter = () => {
  const router = Router();

  router.post("/signin", loginController);

  return router;
};

const createRegisterRouter = () => {
  const router = Router();

  router.post("/signup", createUserController);

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
