import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import {
  deleteCardController,
  getCardsController,
  postCardController,
  putCardLikesController,
  deleteLikeFromCardController,
} from "../controllers";

const createGetCardsRouter = () => {
  const router = Router();

  router.get("/", getCardsController);

  return router;
};

const createPostCardRouter = () => {
  const router = Router();

  router.post(
    "/",
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        link: Joi.string().required().uri(),
      }),
    }),
    postCardController,
  );

  return router;
};

const createDeleteCardRouter = () => {
  const router = Router();

  router.delete("/:id", deleteCardController);

  return router;
};

const createPutLikeOnCardRouter = () => {
  const router = Router();

  router.put("/:cardId/likes", putCardLikesController);

  return router;
};

const createDeleteLikeFromCardRouter = () => {
  const router = Router();

  router.delete("/:cardId/likes", deleteLikeFromCardController);

  return router;
};

export const createCardsRouter = () => {
  const router = Router();

  const getCardsRouter = createGetCardsRouter();
  const postCardRouter = createPostCardRouter();
  const deleteCardRouter = createDeleteCardRouter();
  const putLikeOnCardRouter = createPutLikeOnCardRouter();
  const deleteLikeFromCardRouter = createDeleteLikeFromCardRouter();

  router.use(getCardsRouter);
  router.use(postCardRouter);
  router.use(deleteCardRouter);
  router.use(putLikeOnCardRouter);
  router.use(deleteLikeFromCardRouter);

  return router;
};
