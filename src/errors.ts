import {
  BAD_REQUEST_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  NO_AUTH_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
} from "./constants";

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

export const userErrors = {
  incorrectPostData: {
    message: "Переданы некорректные данные при создании пользователя",
  },
  noUser: {
    message: "Пользователь по указанному _id не найден",
  },
  incorrectPatchUserData: {
    message: "Переданы некорректные данные при обновлении профиля",
  },
  incorrectPatchAvatarData: {
    message: "Переданы некорректные данные при обновлении аватара",
  },
  incorrectId: {
    message: "Передан некорректный id",
  },
  incorrectEmailPas: {
    message: "Неверные логин или пароль",
  },
  incorrectDeleteCardRights: {
    message: "Нет прав на удаление текущей карточки",
  },
  userExist: { message: "Пользователь уже существует" },
};

export const cardsErrors = {
  incorrectPostData: {
    message: "Переданы некорректные данные при создании карточки",
  },
  noCard: {
    message: "Карточка с указанным _id не найдена",
  },
  incorrectPutLike: {
    message: "Переданы некорректные данные для постановки лайка",
  },
  incorrectDeleteLike: {
    message: "Переданы некорректные данные для снятия лайка",
  },
  incorrectId: {
    message: "Передан некорректный id",
  },
};

export const internalError = {
  message: "На сервере произошла ошибка",
};

export const unknownPathError = {
  message:
    "Карточка или пользователь не найден или был запрошен несуществующий роут",
};

export const noAuthError = {
  message: "Необходима авторизация",
};
