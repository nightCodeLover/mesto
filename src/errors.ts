import {
  BAD_REQUEST_ERROR_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  NO_AUTH_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
} from "./constants";

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
