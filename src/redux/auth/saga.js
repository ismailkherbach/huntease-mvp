import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  JOIN_COMPANY,
} from "../actions";
import axios from "axios";
import {
  loginUserSuccess,
  registerUserSuccess,
  logoutUserSuccess,
  forgotPasswordSuccess,
  joinTeamMember,
  joinTeamMemberSuccess,
} from "./actions";

const loginWithEmailPasswordAsync = async (email, password) =>
  await axios({
    method: "post",
    url: "https://huntease-mvp.herokuapp.com/v1/account/login",
    data: {
      email,
      password,
    },
  })
    .then((authUser) => authUser)
    .catch((error) => error);

function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const loginUser = yield call(loginWithEmailPasswordAsync, email, password);
    if (loginUser.status == 200) {
      //   localStorage.setItem("user_id", JSON.stringify(loginUser.data));
      localStorage.setItem("user_id", JSON.stringify(loginUser.data.token));
      yield put(loginUserSuccess(loginUser));
      history.push("/");
    } else {
      console.log("login failed :", loginUser);
    }
  } catch (error) {
    console.log("login error : ", error);
  }
}

const forgotPasswordAsync = async (email) =>
  await axios({
    method: "post",
    url: "https://huntease-mvp.herokuapp.com/v1/account/forgot-password",
    data: {
      email,
    },
  })
    .then((authUser) => authUser)
    .catch((error) => error);

function* forgotPassword({ payload }) {
  const { email } = payload.forgotUserMail;
  try {
    yield call(forgotPasswordAsync, email);
    yield put(forgotPasswordSuccess("success"));
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
  })
    .then((authUser) => console.log(authUser))
    .catch((error) => error);

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

const joinTeamAsync = async (teamCode) =>
  await axios({
    method: "post",
    url: "https://huntease-mvp.herokuapp.com/v1/account/check-token",
    data: {
      email: "gi_kherbach@esi.dz",
      token: teamCode,
    },
  })
    .then((authUser) => authUser)
    .catch((error) => error);

function* joinTeam({ payload }) {
  const { teamCode } = payload.teamJoinCode;
  try {
    yield call(joinTeamAsync, teamCode);
    yield put(joinTeamMemberSuccess("success"));
  } catch (error) {}
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

const logoutAsync = async (history) => {
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
  try {
    const logoutUser = yield call(logoutAsync, history);
    console.log(JSON.parse(localStorage.getItem("user_id")));
    console.log(logoutUser);
    if (logoutUser) {
      yield put(logoutUserSuccess(logoutUser));

      history.push("/user/login");
      localStorage.removeItem("user_id");
    } else {
      console.log("logout failed :", logoutUser);
    }
  } catch (error) {}
}

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

export function* watchForgotPassword() {
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout);
}

export function* watchRegisterUser() {
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}
export function* watchJoinTeam() {
  yield takeEvery(JOIN_COMPANY, joinTeam);
}
export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchForgotPassword),
    fork(watchRegisterUser),
    fork(watchLogoutUser),
    fork(watchJoinTeam),
  ]);
}
