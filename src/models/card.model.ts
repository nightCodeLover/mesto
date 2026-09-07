import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

export interface CardModel {
  name: string;
  link: string;
  owner: string;
  likes: string[];
  createdAt: Date;
}

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: ObjectId,
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    required: true,
    default: [],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const CARDS_COLLECTION_NAME = "cards";

export const Card = mongoose.model<CardModel>("card", cardSchema);
