// русский
let ru = {
  pwcheckallowedchars: "Недопустимое значение", // ввод запрещенных символов в поле имени
  emailMask: "Недопустимое значение", // ввод запрещенных символов в поле почты
  email: "Введен некорректный e-mail",
  required: "Поле не заполнено",
  nameMinLength: "Минимум 2 символа",
  nameMaxLength: "Максимум 80 символов",
  phoneMinLength: "Номер указан не полностью",
  msgMinLength: "Минимум 10 символов",
  msgMaxLength: "Максимум 2000 символов",
  supportTitleMaxLength: "Максимум 100 символов",

  order: {
    empty: "Не выбрано",
    defaultPrice: "0"
  }
}
// английский
let en = {
  pwcheckallowedchars: "Недопустимое значение", // ввод запрещенных символов в поле имени
  emailMask: "Недопустимое значение", // ввод запрещенных символов в поле почты
  email: "Введен некорректный e-mail",
  required: "Поле не заполнено",
  nameMinLength: "Минимум 2 символа",
  nameMaxLength: "Максимум 80 символов",
  phoneMinLength: "Номер указан не полностью",
  msgMinLength: "Минимум 10 символов",
  msgMaxLength: "Максимум 2000 символов",
  supportTitleMaxLength: "Максимум 100 символов",

  order: {
    empty: "Не выбрано",
    defaultPrice: "0"
  }
}

// Татарский
let tat = {
  pwcheckallowedchars: "Недопустимое значение", // ввод запрещенных символов в поле имени
  emailMask: "Недопустимое значение", // ввод запрещенных символов в поле почты
  email: "Введен некорректный e-mail",
  required: "Поле не заполнено",
  nameMinLength: "Минимум 2 символа",
  nameMaxLength: "Максимум 80 символов",
  phoneMinLength: "Номер указан не полностью",
  msgMinLength: "Минимум 10 символов",
  msgMaxLength: "Максимум 2000 символов",
  supportTitleMaxLength: "Максимум 100 символов",

  order: {
    empty: "Не выбрано",
    defaultPrice: "0"
  }
}

export const langSettings = function (input) {
  if (!input) {
    console.error('Не удалось загрузить языковые настройки')
    return ru;
  }
  // Проверяется значение input и возвращается соответствующий объект фраз(по умолчанию русский)
  if (input.value.toUpperCase == "ENGLISH") {
    return en;
  } else if (input.value.toUpperCase == "RUSSIAN") {
    return ru;
  } else if (input.value.toUpperCase == "TATAR") {
    return tat;
  } else
    return ru;
}