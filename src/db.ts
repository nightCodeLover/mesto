import mongoose from "mongoose";

export const connectMongoDb = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("MongoDB connection error");
  }

  await mongoose.connect(process.env.DATABASE_URL);

  console.log("Connected to MongoDb");
};
