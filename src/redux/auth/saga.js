import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { LOGIN_USER, REGISTER_USER, LOGOUT_USER } from "../actions";
import axios from "axios";
import { loginUserSuccess, registerUserSuccess } from "./actions";

const loginWithEmailPasswordAsync = async (email, password) =>
  await axios({
    method: "post",
    url: "https://huntease-mvp.herokuapp.com/v1/account/login",
    data: {
      email,
      password
    }
  })
    .then(authUser => authUser)
    .catch(error => error);

function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const loginUser = yield call(loginWithEmailPasswordAsync, email, password);
    if (loginUser.status == 200) {
      localStorage.setItem("token", loginUser.data.token);

      yield put(loginUserSuccess(loginUser));
      history.push("/");
    } else {
      console.log("login failed :", loginUser);
    }
  } catch (error) {
    console.log("login error : ", error);
  }
}

const registerWithEmailPasswordAsync = async (
  firstname,
  lastname,
  email,
  password
) =>
  await axios({
    method: "post",
    url: "http://localhost:5000/api/v1/auth/register",
    data: {
      firstname,
      lastname,
      email,
      password
    }
  })
    .then(authUser => authUser)
    .catch(error => error);

function* registerWithEmailPassword({ payload }) {
  const { firstname, lastname, email, password } = payload.user;
  const { history } = payload;
  try {
    const registerUser = yield call(
      registerWithEmailPasswordAsync,
      firstname,
      lastname,
      email,
      password
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
export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

export function* watchRegisterUser() {
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}
export default function* rootSaga() {
  yield all([fork(watchLoginUser), fork(watchRegisterUser)]);
}
