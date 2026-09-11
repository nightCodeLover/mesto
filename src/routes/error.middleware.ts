import { NextFunction, Request, Response } from "express";
import { internalError, unknownPathError } from "../errors";

export const internalErrorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  const { message, code } = internalError;

  res.status(code).send({ message });
};

export const unknownPathErrorMiddleware = (req: Request, res: Response) => {
  const { message, code } = unknownPathError;

  res.status(code).send({ message });
};
