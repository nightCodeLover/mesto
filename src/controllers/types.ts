import { UserModel } from "../models";

export type UpdateUserModel = Partial<UserModel>;

export type UpdateUserAvatar = {
  avatar: string;
};
