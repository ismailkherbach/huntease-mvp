import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_PROFILE,
  EDIT_PROFILE,
  ADD_PHONE_NUMBER,
  UPDATE_PASSWORD,
} from "../actions";
import axios from "axios";
import {
  getProfileSuccess,
  editProfileSuccess,
  addPhoneNumberSuccess,
  updatePasswordSuccess,
} from "./actions";
import { API_URL } from "../../utils/utils";

const BASIC_URL = "https://huntease-mvp.herokuapp.com/v1";

const editProfileAsync = async (firstName, lastName) => {
  let bodyFormdata = new FormData();
  bodyFormdata.append("firstName", firstName);
  bodyFormdata.append("lastName", lastName);
  //if you expect JSON response*/
  return await axios({
    method: "put",
    url: API_URL + `user/`,
    data: bodyFormdata,
    headers: {
      authorization: JSON.parse(localStorage.getItem("user_id")),
    },
  });
};

function* editProfile({ payload }) {
  const { firstName, lastName } = payload;
  try {
    const editResponse = yield call(editProfileAsync, firstName, lastName);
    if (editResponse.status == 201) {
      yield put(editProfileSuccess(editResponse));
      console.log(editResponse);
    } else {
      console.log("edit failed : ", editResponse);
    }
  } catch (error) {
    console.log("edit error : ", error);
  }
}

const getUserAsync = async () =>
  await axios({
    method: "get",
    url: API_URL + `user/profile`,

    headers: {
      authorization: JSON.parse(localStorage.getItem("user_id")),
    },
  });

function* getUser({}) {
  try {
    const getResponse = yield call(getUserAsync);
    if (getResponse.status == 200) {
      yield put(getProfileSuccess(getResponse.data.user));
      console.log(getResponse.data.user);
    } else {
      console.log("get failed :", getResponse);
    }
  } catch (error) {
    console.log("get error : ", error);
  }
}

const addPhoneNumberAsync = async (phone) =>
  await axios({
    method: "post",
    url: `https://huntease-mvp.herokuapp.com/v1/calling/addNumber`,
    data: { phone: phone },
    headers: {
      authorization: JSON.parse(localStorage.getItem("user_id")),
    },
  });

function* addPhoneNumber({ payload }) {
  const { phone } = payload;

  try {
    const addResponse = yield call(addPhoneNumberAsync, phone);
    if (addResponse.status == 200) {
      yield put(addPhoneNumberSuccess(addResponse.data));
      console.log(addResponse.data);
    } else {
      console.log("add failed :", addResponse);
    }
  } catch (error) {
    console.log("add error : ", error);
  }
}

const updatePasswordAsync = async (old, newPass) =>
  await axios({
    method: "put",
    url: API_URL + `user/`,
    data: {
      password: {
        old: old,
        new: newPass,
      },
    },
    headers: {
      authorization: JSON.parse(localStorage.getItem("user_id")),
    },
  });

function* updatePassword({ payload }) {
  const { old, newPass } = payload;

  try {
    const updateResponse = yield call(updatePasswordAsync, old, newPass);
    if (updateResponse.status == 200) {
      yield put(updatePasswordSuccess(updateResponse));
      console.log(console.log(updateResponse.data));
    } else {
      console.log("update failed :", updateResponse);
    }
  } catch (error) {
    console.log("update error : ", error);
  }
}

export function* watchGetProfile() {
  yield takeEvery(GET_PROFILE, getUser);
}

export function* watchUpdatePassword() {
  yield takeEvery(UPDATE_PASSWORD, updatePassword);
}

export function* watchEditProfile() {
  yield takeEvery(EDIT_PROFILE, editProfile);
}

export function* watchAddNumber() {
  yield takeEvery(ADD_PHONE_NUMBER, addPhoneNumber);
}

export default function* rootSaga() {
  yield all([
    fork(watchEditProfile),
    fork(watchGetProfile),
    fork(watchAddNumber),
    fork(watchUpdatePassword),
  ]);
}
