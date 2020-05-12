// Login

export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const REGISTER_USER = "REGISTER_USER";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const LOGOUT_USER = "LOGOUT_USER";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_ERROR = "FORGOT_PASSWORD_ERROR";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_ERROR = "RESET_PASSWORD_ERROR";
export const JOIN_COMPANY = "JOIN_COMPANY";
export const JOIN_COMPANY_SUCCESS = "JOIN_COMPANY_SUCCESS";
export const JOIN_COMPANY_ERROR = "JOIN_COMPANY_ERROR";

// Dashboard //

export const PERFORMANCE_LIST_GET = "PERFORMANCE_LIST_GET";
export const PERFORMANCE_LIST_GET_SUCCESS = "PERFORMANCE_LIST_GET_SUCCESS";
export const PERFORMANCE_LIST_GET_ERROR = "PERFORMANCE_LIST_GET_ERROR";

export const CALLS_LIST_GET = "CALLS_LIST_GET";
export const CALLS_LIST_GET_SUCCESS = "CALLS_LIST_GET_SUCCESS";
export const CALLS_LIST_GET_ERROR = "CALLS_LIST_GET_ERROR";

export const ENGAGEMENT_RATE = "ENGAGEMENT_RATE";
export const ENGAGEMENT_RATE_SUCCESS = "ENGAGEMENT_RATE_SUCCESS";
export const ENGAGEMENT_RATE_ERROR = "ENGAGEMENT_RATE_ERROR";

export const MEETINGS_LIST_GET = "MEETINGS_LIST_GET";
export const MEETINGS_LIST_GET_SUCCESS = "MEETINGS_LIST_GET_SUCCESS";
export const MEETINGS_LIST_GET_ERROR = "MEETINGS_LIST_GET_ERROR";

export const TEAM_LIST_ADD_MEMBER = "TEAM_LIST_ADD_MEMBER";
export const TEAM_LIST_ADD_MEMBER_SUCCESS = "TEAM_LIST_ADD_MEMBER_SUCCESS";
export const TEAM_LIST_ADD_MEMBER_ERROR = "TEAM_LIST_ADD_MEMBER_ERROR";
export const TEAM_LIST_GET_MEMBER = "TEAM_LIST_GET_MEMBER";
export const TEAM_LIST_GET_MEMBER_SUCCESS = "TEAM_LIST_GET_MEMBER_SUCCESS";
export const TEAM_LIST_GET_MEMBER_ERROR = "TEAM_LIST_GET_MEMBER_ERROR";

/* GUIDE */

export const ADD_GUIDE = "ADD_GUIDE";
export const ADD_GUIDE_SUCCESS = "ADD_GUIDE_SUCCESS";
export const ADD_GUIDE_ERROR = "ADD_GUIDE_ERROR";
export const GET_GUIDE = "GET_GUIDE";
export const GET_GUIDE_SUCCESS = "GET_GUIDE_SUCCESS";
export const GET_GUIDE_ERROR = "GET_GUIDE_ERROR";
export const UPDATE_GUIDE = "UPDATE_GUIDE";
export const UPDATE_GUIDE_SUCCESS = "UPDATE_GUIDE_SUCCESS";
export const UPDATE_GUIDE_ERROR = "UPDATE_GUIDE_ERROR";
export const DELETE_GUIDE = "DELETE_GUIDE";
export const DELETE_GUIDE_SUCCESS = "DELETE_GUIDE_SUCCESS";
export const DELETE_GUIDE_ERROR = "DELETE_GUIDE_ERROR";
/* TEAMS */

export const ADD_TEAM_MEMBER = "ADD_TEAM_MEMBER";
export const ADD_TEAM_MEMBER_SUCCESS = "ADD_TEAM_MEMBER_SUCCESS";
export const ADD_TEAM_MEMBER_ERROR = "ADD_TEAM_MEMBER_ERROR";

export const GET_TEAM_MEMBER = "GET_TEAM_MEMBER";
export const GET_TEAM_MEMBER_SUCCESS = "GET_TEAM_MEMBER_SUCCESS";
export const GET_TEAM_MEMBER_ERROR = "GET_TEAM_MEMBER_ERROR";

export const DELETE_TEAM_MEMBER = "DELETE_TEAM_MEMBER";
export const DELETE_TEAM_MEMBER_SUCCESS = "DELETE_TEAM_MEMBER_SUCCESS";
export const DELETE_TEAM_MEMBER_ERROR = "DELETE_TEAM_MEMBER_ERROR";

/* SETTINGS */

export const CHANGE_LOCALE = "CHANGE_LOCALE";
export const DARK_MODE = "DARK_MODE";
export const WHITE_MODE = "WHITE_MODE";

export * from "./settings/actions";
export * from "./auth/actions";
export * from "./app/dashboard/actions";
export * from "./app/team/actions";
export * from "./app/guide/actions";
