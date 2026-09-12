import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../models";
import { NotAuthorizedError, userErrors } from "../../errors";
import { JWT_TOKEN_AGE } from "../../constants";
import { getJWTSecret } from "../../utils";

type LoginRequestBody = {
  email: string;
  password: string;
};

const authSuccessMessage = "Аутентификация прошла успешно";

export const loginController = async (
  req: Request<Record<string, unknown>, unknown, LoginRequestBody>,
  res: Response,
) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new NotAuthorizedError(userErrors.incorrectEmailPas.message);
  }

  const matched = await bcrypt.compare(password, user.password);

  if (!matched) {
    throw new NotAuthorizedError(userErrors.incorrectEmailPas.message);
  }

  const secret = getJWTSecret();

  const token = jwt.sign({ _id: user._id }, secret, {
    expiresIn: JWT_TOKEN_AGE,
  });

  res.cookie("jwt", token, { httpOnly: true, maxAge: JWT_TOKEN_AGE });

  res.send({ message: authSuccessMessage });
};
