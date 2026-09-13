const NO_AUTH_ERROR_CODE = 401;

const BAD_REQUEST_ERROR_CODE = 400;

const FORBIDDEN_ERROR_CODE = 403;

const NOT_FOUND_ERROR_CODE = 404;

const CONFLICT_ERROR_CODE = 409;

const INTERNAL_SERVER_ERROR_CODE = 500;

export type HttpError = Error & {
  statusCode: number;
};

export class BadRequestError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = BAD_REQUEST_ERROR_CODE;
  }
}

export class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = NOT_FOUND_ERROR_CODE;
  }
}

export class NotAuthorizedError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = NO_AUTH_ERROR_CODE;
  }
}

export class InternalServerError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = INTERNAL_SERVER_ERROR_CODE;
  }
}

export class ConflictError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = CONFLICT_ERROR_CODE;
  }
}

export class ForbiddenError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = FORBIDDEN_ERROR_CODE;
  }
}

export const userErrors = {
  incorrectPostDataMessage: "Переданы некорректные данные при создании пользователя",
  noUserMessage: "Пользователь по указанному _id не найден",
  incorrectPatchUserDataMessage: "Переданы некорректные данные при обновлении профиля",
  incorrectPatchAvatarDataMessage: "Переданы некорректные данные при обновлении аватара",
  incorrectIdMessage: "Передан некорректный id",
  incorrectEmailPasMessage: "Неверные логин или пароль",
  incorrectDeleteCardRightsMessage: "Нет прав на удаление текущей карточки",
  userExistMessage: "Пользователь уже существует",
};

export const cardsErrors = {
  incorrectPostDataMessage: "Переданы некорректные данные при создании карточки",
  noCardMessage: "Карточка с указанным _id не найдена",
  incorrectPutLikeMessage: "Переданы некорректные данные для постановки лайка",
  incorrectDeleteLikeMessage: "Переданы некорректные данные для снятия лайка",
  incorrectIdMessage: "Передан некорректный id",
};

export const internalErrorMessage = "На сервере произошла ошибка";

export const unknownPathErrorMessage = "Карточка или пользователь не найден или был запрошен несуществующий роут";

export const noAuthErrorMessage = "Необходима авторизация";
