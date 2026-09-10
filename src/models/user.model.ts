import mongoose, { Schema } from "mongoose";
import { validateEmail, validateLink } from "./helpers";
import {
  DEFAULT_USER_VALUES,
  INCORRECT_EMAIL,
  INCORRECT_LINK_MESSAGE,
} from "./constants";

export interface UserModel {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: DEFAULT_USER_VALUES.name,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: DEFAULT_USER_VALUES.about,
  },
  avatar: {
    type: String,
    validate: { validator: validateLink, message: INCORRECT_LINK_MESSAGE },
    default: DEFAULT_USER_VALUES.avatar,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: { validator: validateEmail, message: INCORRECT_EMAIL },
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model<UserModel>("user", userSchema);
