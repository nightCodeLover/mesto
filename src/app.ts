import dotenv from "dotenv";
import express from "express";

import { connectMongoDb } from "./db";
import { createAppRouter } from "./routes";
import { internalErrorMiddleware } from "./routes/error.middleware";
import { errorLogger, requestLogger } from "./middlewares";

dotenv.config();

const startApp = async () => {
  await connectMongoDb();
  const app = express();

  const { PORT } = process.env;

  if (!PORT) {
    throw new Error("app run error");
  }

  app.use(express.json());

  app.use(requestLogger);

  const router = createAppRouter(app);

  app.use(router);

  app.use(errorLogger);

  app.use(internalErrorMiddleware);

  app.listen(PORT, () => {
    console.log("Server started on port", PORT);
  });
};

startApp().catch((err) => {
  console.log(err);
  process.exitCode = 1;
});
