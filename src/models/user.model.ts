import mongoose, { Schema } from "mongoose";
import { validateLink } from "./helpers";
import { INCORRECT_LINK_MESSAGE } from "./constants";

export interface UserModel {
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: { validator: validateLink, message: INCORRECT_LINK_MESSAGE },
  },
});

export const User = mongoose.model<UserModel>("user", userSchema);
