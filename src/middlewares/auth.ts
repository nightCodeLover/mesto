import { NextFunction, Response, Request } from "express";
import { noAuthError } from "../errors";
import jwt from "jsonwebtoken";
import { getJWTSecret } from "../utils";

const AUTH_START_WORD = "Bearer ";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith(AUTH_START_WORD)) {
    const { code, message } = noAuthError;

    return res.status(code).json({ message });
  }

  const secret = getJWTSecret();

  const token = authorization.replace(AUTH_START_WORD, "");

  const payload = jwt.verify(token, secret);

  if (typeof payload === "string" || typeof payload._id !== "string") {
    const { code, message } = noAuthError;

    res.status(code).send({
      message,
    });

    return;
  }

  req.user = payload.user;

  next();
};
