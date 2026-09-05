import { MongoClient } from "mongodb";

export const connectMongoClient = async () => {
  if (!process.env.DATABASE_URL) {
    // Подскажите пожалуйста, я хотел в ошибке прописать значение переменных окружения, чтобы можно было удобно посмотреть что сломалось
    // Но потом подумал что это не безопасно, так? можно ли вообще упоминать переменные в логах?
    throw new Error(`MongoDB connection error`);
  }

  const client = new MongoClient(process.env.DATABASE_URL);

  await client.connect();

  console.log("Connected to MongoDb");

  return client;
};
