import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  JOIN_COMPANY,
  JOIN_COMPANY_SUCCESS,
  JOIN_COMPANY_ERROR,
  CONFIRM_ACCOUNT,
  CONFIRM_ACCOUNT_SUCCESS,
  CONFIRM_ACCOUNT_ERROR,
  REGISTER_SIMPLE_USER_SUCCESS,
  REGISTER_SIMPLE_USER_ERROR,
  REGISTER_SIMPLE_USER,
  LOGIN_USER_ERROR,
} from "../actions";

const INIT_STATE = {
  user: localStorage.getItem("user_id"),
  loading: false,
  forgotUserMail: "",
  newPassword: "",
  resetPasswordCode: "",
  teamJoinCode: "",
  message: "",
  error: "",
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true };
    case LOGIN_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        loading: false,
        user: "",
        error: action.payload.message,
      };
    case FORGOT_PASSWORD:
      return { ...state, loading: true, error: "" };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        forgotUserMail: action.payload,
        error: "",
      };
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        forgotUserMail: "",
        error: action.payload.message,
      };
    case RESET_PASSWORD:
      return { ...state, loading: true, error: "" };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        newPassword: action.payload,
        resetPasswordCode: "",
        error: "",
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        newPassword: "",
        resetPasswordCode: "",
        error: action.payload.message,
      };

    case REGISTER_SIMPLE_USER:
      return { ...state, loading: true, error: "" };
    case REGISTER_SIMPLE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfos: action.payload,
        error: "",
      };
    case REGISTER_SIMPLE_USER_ERROR:
      return {
        ...state,
        loading: false,
        userInfos: "",
        error: action.payload.message,
      };

    case CONFIRM_ACCOUNT:
      return { ...state, loading: true, error: "" };
    case CONFIRM_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        account: action.payload,
        error: "",
      };
    case CONFIRM_ACCOUNT_ERROR:
      return {
        ...state,
        loading: false,
        account: "",
        error: action.payload.message,
      };

    case REGISTER_USER:
      return { ...state, loading: true };
    case REGISTER_USER_SUCCESS:
      return { ...state, loading: false };
    case LOGOUT_USER_SUCCESS:
      return { ...state, user: null, error: "" };
    case LOGOUT_USER:
      return { ...state };

    case JOIN_COMPANY:
      return { ...state, loading: true, error: "" };
    case JOIN_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        teamJoinCode: action.payload,
        error: "",
      };
    case JOIN_COMPANY_ERROR:
      return {
        ...state,
        loading: false,
        teamJoinCode: "",
        error: action.payload.error,
      };
    default:
      return { ...state };
  }
};
