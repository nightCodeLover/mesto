import Joi from "joi";
import type { Request, Response, NextFunction } from "express";
import { userErrors } from "../controllers";

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(2).max(30),
    about: Joi.string().trim().min(2).max(200),
    avatar: Joi.string().trim().min(2),
  })
    .min(1)
    .unknown(false);

  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const { message, code } = userErrors.incorrectPostData;

    res.status(code).send({ message });

    return;
  }

  req.body = value;
  next();
};

export const validateUpdateUserAvatar = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object({
    avatar: Joi.string().trim().min(2),
  })
    .min(1)
    .unknown(false);

  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const { message, code } = userErrors.incorrectPatchAvatarData;

    res.status(code).send({
      message,
    });

    return;
  }

  req.body = value;
  next();
};
