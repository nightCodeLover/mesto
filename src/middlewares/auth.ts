import type { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { noAuthError, NotAuthorizedError } from "../errors";
import { getJWTSecret } from "../utils";

const AUTH_START_WORD = "Bearer ";

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith(AUTH_START_WORD)) {
    throw new NotAuthorizedError(noAuthError.message);
  }

  const secret = getJWTSecret();

  const token = authorization.replace(AUTH_START_WORD, "");

  let payload;

  try {
    payload = jwt.verify(token, secret);
  } catch (error) {
    throw new NotAuthorizedError(noAuthError.message);
  }

  if (typeof payload === "string" || typeof payload._id !== "string") {
    throw new NotAuthorizedError(noAuthError.message);
  }

  req.user = { _id: payload._id };

  next();
};
