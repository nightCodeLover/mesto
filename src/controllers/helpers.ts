import type { Response, Request } from "express";
import { Card, User } from "../models";
import type { RequestWithUser } from "../app";
import { cardsErrors, userErrors } from "./errors";

export const likeCard = ({
  cardId,
  userId,
}: {
  cardId: string;
  userId: string;
}) =>
  Card.findByIdAndUpdate(
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
}) =>
  Card.findByIdAndUpdate(
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

export const getMockOwner = (req: Request) => {
  const authenticatedRequest = req as typeof req & RequestWithUser;

  return authenticatedRequest.user._id;
};

export const checkCardInDb = async ({
  cardId,
  res,
}: {
  cardId: string;
  res: Response;
}) => {
  const card = await Card.findById(cardId);

  if (!card) {
    const { code, message } = cardsErrors.noCard;

    res.status(code).send({ message });
  }

  return card;
};

export const checkUserInDb = async ({
  id,
  res,
}: {
  id: string;
  res: Response;
}) => {
  const user = await User.findById(id);

  if (!user) {
    const { code, message } = userErrors.noUser;

    res.status(code).send({ message });
  }

  return user;
};
