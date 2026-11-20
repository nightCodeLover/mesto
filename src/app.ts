import { errors } from "celebrate";
import dotenv from "dotenv";
import express from "express";

import cookieParser from "cookie-parser";
import { connectMongoDb } from "./db";
import { createAppRouter } from "./routes";
import {
  errorCatcherMiddleware,
  errorLogger,
  requestLogger,
  unknownPathErrorMiddleware,
} from "./middlewares";
import cors from "cors";

dotenv.config();

const startApp = async () => {
  await connectMongoDb();
  const app = express();

  const { PORT, FRONT_DOMAIN_NAME } = process.env;

  if (!PORT) {
    throw new Error("app run error");
  }

  app.use(express.json());

  app.use(requestLogger);

  app.use(cookieParser());

  app.use(cors({ credentials: true, origin: FRONT_DOMAIN_NAME }));

  const router = createAppRouter(app);

  app.get("/crash-test", () => {
    setTimeout(() => {
      throw new Error("Сервер сейчас упадёт");
    }, 0);
  });

  app.use(router);

  app.use(unknownPathErrorMiddleware);

  app.use(errorLogger);

  app.use(errors());

  app.use(errorCatcherMiddleware);

  app.listen(PORT, () => {
    console.log("Server started on port", PORT);
  });
};

startApp().catch((err) => {
  console.log(err);
  process.exitCode = 1;
});
