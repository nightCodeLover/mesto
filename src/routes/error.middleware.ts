import { NextFunction, Request, Response } from "express";
import { internalError, unknownPathError } from "../controllers/errors";

export const internalErrorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { message, code } = internalError;

  res.status(code).send({ message });
};

export const unknownPathErrorMiddleware = (req: Request, res: Response) => {
  const { message, code } = unknownPathError;

  res.status(code).send({ message });
};
