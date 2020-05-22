import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
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
} from "../actions";

export const loginUser = (user, history) => ({
  type: LOGIN_USER,
  payload: { user, history },
});
export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});
export const forgotPassword = (forgotUserMail, history) => ({
  type: FORGOT_PASSWORD,
  payload: { forgotUserMail, history },
});
export const forgotPasswordSuccess = (forgotUserMail) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: forgotUserMail,
});
export const forgotPasswordError = (message) => ({
  type: FORGOT_PASSWORD_ERROR,
  payload: { message },
});

export const resetPassword = ({ resetPasswordCode, newPassword, history }) => ({
  type: RESET_PASSWORD,
  payload: { resetPasswordCode, newPassword, history },
});
export const resetPasswordSuccess = (newPassword) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: newPassword,
});
export const resetPasswordError = (message) => ({
  type: RESET_PASSWORD_ERROR,
  payload: { message },
});

export const registerSimpleUser = ({
  email,
  password,
  role,
  token,
  history,
}) => ({
  type: REGISTER_SIMPLE_USER,
  payload: { email, password, role, token, history },
});
export const registerSimpleUserSuccess = (user) => ({
  type: REGISTER_SIMPLE_USER_SUCCESS,
  payload: user,
});
export const registerSimpleUserdError = (message) => ({
  type: REGISTER_SIMPLE_USER_ERROR,
  payload: { message },
});

export const confirmAccount = ({ confirmToken, history }) => ({
  type: CONFIRM_ACCOUNT,
  payload: { confirmToken, history },
});
export const confirmAccountSuccess = (account) => ({
  type: CONFIRM_ACCOUNT_SUCCESS,
  payload: account,
});
export const rconfirmAccountError = (message) => ({
  type: CONFIRM_ACCOUNT_ERROR,
  payload: { message },
});

export const registerUser = (user, history) => ({
  type: REGISTER_USER,
  payload: { user, history },
});
export const registerUserSuccess = (user) => ({
  type: REGISTER_USER_SUCCESS,
  payload: user,
});

export const joinTeamMember = (joinTeamCode, history) => ({
  type: JOIN_COMPANY,
  payload: { joinTeamCode, history },
});
export const joinTeamMemberSuccess = (joinTeamCode) => ({
  type: JOIN_COMPANY_SUCCESS,
  payload: joinTeamCode,
});
export const joinTeamMemberError = (error) => ({
  type: JOIN_COMPANY_ERROR,
  payload: { error },
});

export const logoutUser = (history) => ({
  type: LOGOUT_USER,
  payload: { history },
});
export const logoutUserSuccess = (history) => ({
  type: LOGOUT_USER_SUCCESS,
  payload: { history },
});
