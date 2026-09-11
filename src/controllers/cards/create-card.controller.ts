import type { Request, Response } from "express";
import mongoose from "mongoose";
import { CREATED_STATUS_CODE } from "../../constants";
import type { CardModel } from "../../models";
import { cardsErrors } from "../../errors";
import { createCard, getMockOwner } from "../helpers";

export const postCardController = async (
  req: Request<Record<string, never>, unknown, CardModel>,
  res: Response,
) => {
  const { link, name } = req.body;

  const mockOwner = getMockOwner(req);

  try {
    await createCard({
      name,
      link,
      ownerId: mockOwner,
    });

    res.status(CREATED_STATUS_CODE).send({});
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const { message, code } = cardsErrors.incorrectPostData;

      res.status(code).send({ message });

      return;
    }

    throw error;
  }
};
