import { CHANGE_LOCALE, DARK_MODE, WHITE_MODE } from "../actions";

export const changeLocale = locale => {
  localStorage.setItem("currentLanguage", locale);
  return {
    type: CHANGE_LOCALE,
    payload: locale
  };
};

export const darkMode = color => {
  localStorage.setItem("dark_mode", color);
  return {
    type: DARK_MODE,
    payload: color
  };
};

export const whiteMode = dark_mode => {
  localStorage.setItem("dark_mode", darkMode);
  return {
    type: WHITE_MODE,
    payload: dark_mode
  };
};
