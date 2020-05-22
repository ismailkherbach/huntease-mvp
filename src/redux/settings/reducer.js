import { defaultLocale, localeOptions } from "../../constants/defaultValues";

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

const INIT_STATE = {
  locale:
    localStorage.getItem("currentLanguage") &&
    localeOptions.filter(
      (x) => x.id === localStorage.getItem("currentLanguage")
    ).length > 0
      ? localStorage.getItem("currentLanguage")
      : defaultLocale,
  dark_mode: localStorage.getItem("dark_mode")
    ? localStorage.getItem("dark_mode")
    : "",
  profile: "",
  error: "",
  message: "",
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case EDIT_PROFILE:
      return { ...state, loading: true, error: "" };
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload,
        error: "",
      };
    case EDIT_PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        profile: "",
        error: action.payload,
      };
    case GET_PROFILE:
      return { ...state, loading: true, error: "" };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload,
        error: "",
      };
    case GET_PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        profile: "",
        error: action.payload,
      };

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
