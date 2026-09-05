import dotenv from "dotenv";

import { connectMongoClient } from "./db";

dotenv.config();

const startApp = async () => {
  const client = await connectMongoClient();
};

startApp().catch((err) => {
  console.log(err);
  process.exitCode = 1;
});
