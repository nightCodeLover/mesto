import dotenv from "dotenv";
import express from "express";

import type { Request } from "express";
import { connectMongoDb } from "./db";
import { createAppRouter } from "./routes";

dotenv.config();

export type RequestWithUser = Request & {
  user: {
    _id: string;
  };
};

const startApp = async () => {
  await connectMongoDb();
  const app = express();

  const { PORT } = process.env;

  if (!PORT) {
    throw new Error("app run error");
  }

  app.use((req, res, next) => {
    (req as RequestWithUser).user = {
      _id: "6a9b53d345d93d424ba9be97",
    };

    next();
  });
  app.use(express.json());

  const router = createAppRouter();

  app.use(router);

  app.listen(PORT, () => {
    console.log("Server started on port", PORT);
  });
};

startApp().catch((err) => {
  console.log(err);
  process.exitCode = 1;
});
