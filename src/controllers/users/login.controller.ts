import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../models";
import { userErrors } from "../../errors";
import { JWT_TOKEN_AGE } from "../../constants";
import { getJWTSecret } from "../../utils";

type LoginRequestBody = {
  email: string;
  password: string;
};

const authSuccessMessage = "Аутентификация прошла успешно";

const sendNoAuthError = (res: Response) => {
  const { message, code } = userErrors.incorrectEmailPas;

  return res.status(code).send({ message });
};

export const loginController = async (
  req: Request<Record<string, unknown>, unknown, LoginRequestBody>,
  res: Response,
) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    sendNoAuthError(res);

    return;
  }

  const matched = await bcrypt.compare(password, user.password);

  if (!matched) {
    sendNoAuthError(res);

    return;
  }

  const secret = getJWTSecret();

  const token = jwt.sign({ _id: user._id }, secret, {
    expiresIn: JWT_TOKEN_AGE,
  });

  res.cookie("jwt", token, { httpOnly: true, maxAge: JWT_TOKEN_AGE });

  res.send({ message: authSuccessMessage });
};
