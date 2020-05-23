import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  JOIN_COMPANY,
  RESET_PASSWORD,
  CONFIRM_ACCOUNT,
  REGISTER_SIMPLE_USER,
} from "../actions";
import axios from "axios";
import {
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  logoutUserSuccess,
  forgotPasswordSuccess,
  forgotPasswordError,
  confirmAccountSuccess,
  joinTeamMember,
  joinTeamMemberSuccess,
  joinTeamMemberError,
  registerSimpleUserSuccess,
  resetPassword,
  resetPasswordSuccess,
  confirmAccountError,
  resetPasswordError,
} from "./actions";
const credentials = ["token", "twilioToken", "user", "user_id"];
const loginWithEmailPasswordAsync = async (email, password) =>
  await axios({
    method: "post",
    url: "https://huntease-mvp.herokuapp.com/v1/account/login",
    data: {
      email,
      password,
    },
  });

function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const loginUser = yield call(loginWithEmailPasswordAsync, email, password);
    console.log(loginUser);
    if (loginUser.status == 200) {
      //   localStorage.setItem("user_id", JSON.stringify(loginUser.data));
      localStorage.setItem("user_id", JSON.stringify(loginUser.data.token));
      localStorage.setItem(
        "twilioToken",
        JSON.stringify(loginUser.data.twilioToken)
      );
      localStorage.setItem("user", JSON.stringify(loginUser.data.user));
      let domain = loginUser.data.user.email.split("@")[1];
      localStorage.setItem("domain", JSON.stringify(domain));

      yield put(loginUserSuccess(loginUser));
      history.push("/");
    } else {
      console.log("login failed :", loginUser);
    }
  } catch (error) {
    if (error.response.status == 401) {
      yield put(loginUserError("Wrong email or password"));
    }
    if (error.response.status == 422) {
      yield put(
        loginUserError("Account not activated please verify your email")
      );
    }
  }
}

const forgotPasswordAsync = async (email) =>
  await axios({
    method: "post",
    url: "https://huntease-mvp.herokuapp.com/v1/account/forgot-password",
    data: {
      email,
    },
  });

function* forgotPassword({ payload }) {
  const { email } = payload.forgotUserMail;
  try {
    yield call(forgotPasswordAsync, email);
    yield put(forgotPasswordSuccess("success"));
  } catch (error) {
    if (error.response.status == 422) {
      yield put(forgotPasswordError("Invalid email or doesn't exist"));
    }
  }
}

const resetPasswordAsync = async (resetPasswordCode, newPassword) =>
  await axios({
    method: "post",
    url: "https://huntease-mvp.herokuapp.com/v1/account/reset-password",
    data: {
      password: newPassword,
      token: resetPasswordCode,
      confirmPassword: newPassword,
    },
  });

function* resetNewPassword({ payload }) {
  const { resetPasswordCode, newPassword, history } = payload;
  try {
    const resetResponse = yield call(
      resetPasswordAsync,
      resetPasswordCode,
      newPassword
    );
    if (resetResponse.status == 200) {
      yield put(forgotPasswordSuccess(newPassword));
      history.push("/user/login");
    }
  } catch (error) {
    if (error.response.status == 401) {
      yield put(forgotPasswordError("Invalid reset code"));
    }
  }
}

const registerSimpleUserAsync = async (email, password, role, token) =>
  await axios({
    method: "post",
    url: "https://huntease-mvp.herokuapp.com/v1/account/register",
    data: {
      email,
      password,
      confirmPassword: password,
      role,
      token,
    },
  });

function* registerSimpleUser({ payload }) {
  const { email, password, role, token, history } = payload;
  console.log(payload);
  try {
    const registerResponse = yield call(
      registerSimpleUserAsync,
      email,
      password,
      role,
      token
    );
    if (registerResponse.status == 200) {
      yield put(registerSimpleUserSuccess(registerResponse));
      setTimeout(() => {
        history.push("/user/login");
      }, 2000);
    }
  } catch (error) {}
}

const registerWithEmailPasswordAsync = async (
  firstName,
  lastName,
  email,
  password,
  phone,
  memberCount,
  role,
  industry
) =>
  await axios({
    method: "post",
    url: "https://huntease-mvp.herokuapp.com/v1/account/register",
    data: {
      email,
      password,
      phone,
      firstName,
      lastName,
      role: "manager",
      company: {
        industry,
        memberCount,
      },
    },
  });

function* registerWithEmailPassword({ payload }) {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    memberCount,
    industry,
  } = payload.user;
  const { history } = payload;

  try {
    const registerUser = yield call(
      registerWithEmailPasswordAsync,
      firstName,
      lastName,
      email,
      password,
      phone,
      industry,
      memberCount
    );
    if (registerUser.status == 201) {
      yield put(registerUserSuccess(registerUser));
      history.push("/user/login");
    } else {
      console.log("register failed :", registerUser);
    }
  } catch (error) {
    console.log("register error : ", error);
  }
}

const confirmAccountAsync = async (confirmToken) =>
  await axios({
    method: "get",
    url: `https://huntease-mvp.herokuapp.com/v1/account/confirm/${confirmToken}`,
  });

function* confirmAccount({ payload }) {
  const { confirmToken, history } = payload;

  try {
    const confirmResponse = yield call(confirmAccountAsync, confirmToken);
    if (confirmResponse.status == 200) {
      yield put(confirmAccountSuccess("success"));

      setTimeout(() => {
        history.push("/user/login");
      }, 3000);
    } else {
      console.log("confirm failed :", confirmResponse);
    }
  } catch (error) {
    yield put(confirmAccountError("Invalid verification code"));

    console.log("confirm error : ", error);
  }
}

const joinTeamAsync = async (teamJoinCode) =>
  await axios({
    method: "post",
    url: "https://huntease-mvp.herokuapp.com/v1/account/check-token",
    data: {
      email: "gi_kherbach@esi.dz",
      token: teamJoinCode,
    },
  });

function* joinTeam({ payload }) {
  const { teamJoinCode } = payload.joinTeamCode;
  try {
    const joinResponse = yield call(joinTeamAsync, teamJoinCode);
    console.log(joinResponse.data);

    yield put(joinTeamMemberSuccess(joinResponse.data));
  } catch (error) {
    yield put(joinTeamMemberError("invalid team code"));
  }
}

const loginWithLinkedInAsync = () => {};

/*const logoutAsync = async history => {
  await auth
    .signOut()
    .then(authUser => authUser)
    .catch(error => error);
  history.push("/");
};

function* logout({ payload }) {
  const { history } = payload;
  try {
    yield call(logoutAsync, history);
    localStorage.removeItem("user_id");
  } catch (error) {}
}

export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout);
}
*/

const logoutAsync = async () =>
  await axios({
    method: "post",
    url: "https://huntease-mvp.herokuapp.com/v1/account/logout",
    headers: {
      authorization: JSON.parse(localStorage.getItem("user_id")),
    },
  });

function* logout({ payload }) {
  const { history } = payload;
  try {
    const logoutResponse = yield call(logoutAsync);

    if (logoutResponse.status == 200) {
      yield put(logoutUserSuccess(logoutResponse));
      history.push("/user/login");
      localStorage.clear();
    }
  } catch (error) {}
}

/*const logoutAsync = async () => {
  await axios({
    method: "post",
    url: "https://huntease-mvp.herokuapp.com/v1/account/logout",
    headers: {
      authorization: JSON.parse(localStorage.getItem("user_id")),
    },
  })
    .then((authUser) => authUser)
    .catch((error) => error);
};

function* logout({ payload }) {
  const { history } = payload;
  console.log(history);
  try {
    const logoutUser = yield call(logoutAsync);
    console.log(logoutUser);

    if (logoutUser.status == 200) {
      yield put(logoutUserSuccess(logoutUser));
      history.push("/user/login");
      localStorage.removeItem("user_id");
    } else {
      console.log("logout failed :", logoutUser);
    }
  } catch (error) {}
}*/

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

export function* watchForgotPassword() {
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}
export function* watchResetPassword() {
  yield takeEvery(RESET_PASSWORD, resetNewPassword);
}
export function* watchConfirmAccount() {
  yield takeEvery(CONFIRM_ACCOUNT, confirmAccount);
}

export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout);
}

export function* watchRegisterUser() {
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

export function* watchRegisterSimpleUser() {
  yield takeEvery(REGISTER_SIMPLE_USER, registerSimpleUser);
}
export function* watchJoinTeam() {
  yield takeEvery(JOIN_COMPANY, joinTeam);
}
export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
    fork(watchConfirmAccount),
    fork(watchRegisterUser),
    fork(watchRegisterSimpleUser),
    fork(watchLogoutUser),
    fork(watchJoinTeam),
  ]);
}
