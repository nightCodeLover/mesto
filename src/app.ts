import dotenv from "dotenv";
import express, { NextFunction } from "express";

import { connectMongoClient } from "./db";
import { createAppRouter } from "./routes";
import { UserModel } from "./models";
import type { Request, Response } from "express";

dotenv.config();

export type RequestWithUser = Request & {
  user: {
    _id: string;
  };
};

const startApp = async () => {
  const client = await connectMongoClient();
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

  app.listen(PORT, () => {
    console.log("Server started on port", PORT);
  });

  const router = createAppRouter(client);

  app.use(router);
};

startApp().catch((err) => {
  console.log(err);
  process.exitCode = 1;
});
