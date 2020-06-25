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
  ADD_PHONE_NUMBER,
  ADD_PHONE_NUMBER_SUCCESS,
  ADD_PHONE_NUMBER_ERROR,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERROR,
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
  code: null,
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

    case UPDATE_PASSWORD:
      return { ...state, loading: true, error: "" };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case UPDATE_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_PHONE_NUMBER:
      return { ...state, loading: true, error: "" };
    case ADD_PHONE_NUMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        code: action.payload.code,
        error: "",
      };
    case ADD_PHONE_NUMBER_ERROR:
      return {
        ...state,
        loading: false,
        code: "",
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
