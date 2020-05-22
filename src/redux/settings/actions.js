import {
  CHANGE_LOCALE,
  DARK_MODE,
  WHITE_MODE,
  EDIT_PROFILE,
  EDIT_PROFILE_ERROR,
  EDIT_PROFILE_SUCCESS,
  GET_PROFILE,
  GET_PROFILE_ERROR,
  GET_PROFILE_SUCCESS,
} from "../actions";

export const getProfile = () => ({
  type: GET_PROFILE,
});

export const getProfileSuccess = (profile) => ({
  type: GET_PROFILE_SUCCESS,
  payload: profile,
});

export const getProfileError = (error) => ({
  type: GET_PROFILE_ERROR,
  payload: error,
});

export const editProfile = (profile) => ({
  type: EDIT_PROFILE,
  payload: profile,
});

export const editProfileSuccess = (profile) => ({
  type: EDIT_PROFILE_SUCCESS,
  payload: profile,
});

export const editProfileError = (error) => ({
  type: EDIT_PROFILE_ERROR,
  payload: error,
});

export const changeLocale = (locale) => {
  localStorage.setItem("currentLanguage", locale);
  return {
    type: CHANGE_LOCALE,
    payload: locale,
  };
};

export const darkMode = (color) => {
  localStorage.setItem("dark_mode", color);
  return {
    type: DARK_MODE,
    payload: color,
  };
};

export const whiteMode = (dark_mode) => {
  localStorage.setItem("dark_mode", darkMode);
  return {
    type: WHITE_MODE,
    payload: dark_mode,
  };
};
