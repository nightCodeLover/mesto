import {
  BAD_REQUEST_ERROR_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  NO_AUTH_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
} from "./constants";

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
    super();
    this.statusCode = NO_AUTH_ERROR_CODE;
  }
}

export class InternalServerError extends Error {
  statusCode: number;

  constructor(message: string) {
    super();
    this.statusCode = INTERNAL_SERVER_ERROR_CODE;
  }
}

export const userErrors = {
  incorrectPostData: {
    code: BAD_REQUEST_ERROR_CODE,
    message: "Переданы некорректные данные при создании пользователя",
  },
  noUser: {
    code: NOT_FOUND_ERROR_CODE,
    message: "Пользователь по указанному _id не найден",
  },
  incorrectPatchUserData: {
    code: BAD_REQUEST_ERROR_CODE,
    message: "Переданы некорректные данные при обновлении профиля",
  },
  incorrectPatchAvatarData: {
    code: BAD_REQUEST_ERROR_CODE,
    message: "Переданы некорректные данные при обновлении аватара",
  },
  incorrectId: {
    code: BAD_REQUEST_ERROR_CODE,
    message: "Передан некорректный id",
  },
  incorrectEmailPas: {
    code: NO_AUTH_ERROR_CODE,
    message: "Неверные логин или пароль",
  },
  incorrectDeleteCardRights: {
    code: BAD_REQUEST_ERROR_CODE,
    message: "Нет прав на удаление текущей карточки",
  },
};

export const cardsErrors = {
  incorrectPostData: {
    code: BAD_REQUEST_ERROR_CODE,
    message: "Переданы некорректные данные при создании карточки",
  },
  noCard: {
    code: NOT_FOUND_ERROR_CODE,
    message: "Карточка с указанным _id не найдена",
  },
  incorrectPutLike: {
    code: BAD_REQUEST_ERROR_CODE,
    message: "Переданы некорректные данные для постановки лайка",
  },
  incorrectDeleteLike: {
    code: BAD_REQUEST_ERROR_CODE,
    message: "Переданы некорректные данные для снятия лайка",
  },
  incorrectId: {
    code: BAD_REQUEST_ERROR_CODE,
    message: "Передан некорректный id",
  },
};

export const internalError = {
  code: INTERNAL_SERVER_ERROR_CODE,
  message: "На сервере произошла ошибка",
};

export const unknownPathError = {
  code: NOT_FOUND_ERROR_CODE,
  message:
    "Карточка или пользователь не найден или был запрошен несуществующий роут",
};

export const noAuthError = {
  code: NO_AUTH_ERROR_CODE,
  message: "Необходима авторизация",
};
