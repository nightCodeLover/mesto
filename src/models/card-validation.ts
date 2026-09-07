import type { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { cardsErrors } from "../controllers";

export const validateCreateCard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(2).max(30),
    link: Joi.string().trim().min(2),
    owner: Joi.string().trim().min(2),
    likes: Joi.forbidden(),
    createdAt: Joi.forbidden(),
  })
    .min(1)
    .unknown(false);

  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const { message, code } = cardsErrors.incorrectPostData;

    res.status(code).send({ message });

    return;
  }

  req.body = value;
  next();
};
