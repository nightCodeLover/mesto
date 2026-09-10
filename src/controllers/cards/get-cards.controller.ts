import type { Request, Response } from "express";
import { Card } from "../../models";

export const getCardsController = async (req: Request, res: Response) => {
  const cards = await Card.find({});

  res.send(cards);
};
