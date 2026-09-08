import mongoose, { Schema, Types } from "mongoose";
import { validateLink } from "./helpers";
import { INCORRECT_LINK_MESSAGE } from "./constants";

export interface CardModel {
  name: string;
  link: string;
  owner: Types.ObjectId;
  likes: Types.ObjectId[];
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
    validate: { validator: validateLink, message: INCORRECT_LINK_MESSAGE },
  },
  owner: {
    type: Schema.Types.ObjectId,
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

export const Card = mongoose.model<CardModel>("card", cardSchema);
