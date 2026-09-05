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
    require: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    require: true,
  },
  owner: {
    type: ObjectId,
    require: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    require: true,
    default: [],
  },
  createdAt: {
    type: Date,
    require: true,
    default: Date.now(),
  },
});

export const Card = mongoose.model<CardModel>("card", cardSchema);
