import type { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { noAuthErrorMessage, NotAuthorizedError } from "../errors";
import { getJWTSecret } from "../utils";

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.jwt;

  if (typeof token !== "string") {
    throw new NotAuthorizedError(noAuthErrorMessage);
  }

  const secret = getJWTSecret();

  let payload;

  try {
    payload = jwt.verify(token, secret);
  } catch (error) {
    throw new NotAuthorizedError(noAuthErrorMessage);
  }

  if (typeof payload === "string" || typeof payload._id !== "string") {
    throw new NotAuthorizedError(noAuthErrorMessage);
  }

  req.user = { _id: payload._id };

  next();
};
