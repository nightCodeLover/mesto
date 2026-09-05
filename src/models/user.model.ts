import mongoose, { Schema } from "mongoose";

export interface UserModel {
  name: string;
  about: string;
  link: string;
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
  link: {
    type: String,
    require: true,
  },
});

export const User = mongoose.model<UserModel>("user", userSchema);
