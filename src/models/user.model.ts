import mongoose, { Schema } from "mongoose";

export interface UserModel {
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String,
    require: true,
  },
});

export const USERS_COLLECTION_NAME = "users";

export const User = mongoose.model<UserModel>("user", userSchema);
