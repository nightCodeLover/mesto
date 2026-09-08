export const userErrors = {
  incorrectPostData: {
    code: 400,
    message: "Переданы некорректные данные при создании пользователя",
  },
  noUser: {
    code: 404,
    message: "Пользователь по указанному _id не найден",
  },
  incorrectPatchUserData: {
    code: 400,
    message: "Переданы некорректные данные при обновлении профиля",
  },
  incorrectPatchAvatarData: {
    code: 400,
    message: "Переданы некорректные данные при обновлении аватара",
  },
  incorrectId: {
    code: 400,
    message: "Передан некорректный id",
  },
};

export const cardsErrors = {
  incorrectPostData: {
    code: 400,
    message: "Переданы некорректные данные при создании карточки",
  },
  noCard: {
    code: 404,
    message: "Карточка с указанным _id не найдена",
  },
  incorrectPutLike: {
    code: 400,
    message: " Переданы некорректные данные для постановки лайка",
  },
  incorrectDeleteLike: {
    code: 400,
    message: " Переданы некорректные данные для снятия лайка",
  },
  incorrectId: {
    code: 400,
    message: "Передан некорректный id",
  },
};

export const internalError = {
  code: 500,
  message: "На сервере произошла ошибка",
};

export const unknownPathError = {
  code: 404,
  message:
    "Карточка или пользователь не найден или был запрошен несуществующий роут",
};
