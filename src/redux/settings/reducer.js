import { defaultLocale, localeOptions } from "../../constants/defaultValues";

import { CHANGE_LOCALE, DARK_MODE, WHITE_MODE } from "../actions";

const INIT_STATE = {
  locale:
    localStorage.getItem("currentLanguage") &&
    localeOptions.filter(x => x.id === localStorage.getItem("currentLanguage"))
      .length > 0
      ? localStorage.getItem("currentLanguage")
      : defaultLocale,
  dark_mode: localStorage.getItem("dark_mode")
    ? localStorage.getItem("dark_mode")
    : ""
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANGE_LOCALE:
      return { ...state, locale: action.payload };
    case DARK_MODE:
      return { ...state, dark_mode: action.payload };
    case WHITE_MODE:
      return { ...state, dark_mode: action.payload };
    default:
      return { ...state };
  }
};
