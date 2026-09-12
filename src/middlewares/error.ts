import type {
  NextFunction, Request, RequestHandler, Response,
} from "express";
import type { HttpError } from "../errors";
import { INTERNAL_SERVER_ERROR_CODE } from "../constants";
import {
  internalError, NotFoundError, unknownPathError,
} from "../errors";

const isHttpError = (error: unknown): error is HttpError => (
  error instanceof Error
    && "statusCode" in error
    && typeof error.statusCode === "number"
);

export const unknownPathErrorMiddleware: RequestHandler = () => {
  throw new NotFoundError(unknownPathError.message);
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

  res.status(INTERNAL_SERVER_ERROR_CODE).send({
    message: internalError.message,
  });
};
