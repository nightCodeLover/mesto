import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { HttpError } from "../errors";
import {
  InternalServerError,
  internalErrorMessage,
  NotFoundError,
  unknownPathErrorMessage,
} from "../errors";

const isHttpError = (error: unknown): error is HttpError =>
  error instanceof Error &&
  "statusCode" in error &&
  typeof error.statusCode === "number";

export const unknownPathErrorMiddleware: RequestHandler = () => {
  throw new NotFoundError(unknownPathErrorMessage);
};

export const errorCatcherMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  if (isHttpError(error)) {
    res.status(error.statusCode).send({ message: error.message });
    return;
  }

  const { statusCode, message } = new InternalServerError(internalErrorMessage);

  res.status(statusCode).send({ message });
};
