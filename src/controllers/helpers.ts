import mongoose from "mongoose";
import { Card } from "../models";

export const isCorrectId = (id: string): boolean => mongoose.isObjectIdOrHexString(id);

export const likeCard = ({
  cardId,
  userId,
}: {
  cardId: string;
  userId: string;
}) => Card.findByIdAndUpdate(
  cardId,
  { $addToSet: { likes: userId } },
  { runValidators: true, new: true },
);

export const dislikeCard = async ({
  cardId,
  userId,
}: {
  cardId: string;
  userId: string;
}) => Card.findByIdAndUpdate(
  cardId,
  { $pull: { likes: userId } },
  {
    new: true,
    runValidators: true,
  },
);

export const createCard = async ({
  link,
  name,
  ownerId,
}: {
  link: string;
  name: string;
  ownerId: string;
}) => {
  await Card.create({
    name,
    link,
    owner: ownerId,
  });
};
