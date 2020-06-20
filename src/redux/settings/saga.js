import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { GET_PROFILE, EDIT_PROFILE } from "../actions";
import axios from "axios";
import { getProfileSuccess, editProfileSuccess } from "./actions";
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
    url: API_URL + `user/`,

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

export function* watchGetProfile() {
  yield takeEvery(GET_PROFILE, getUser);
}

export function* watchEditProfile() {
  yield takeEvery(EDIT_PROFILE, editProfile);
}

export default function* rootSaga() {
  yield all([fork(watchEditProfile), fork(watchGetProfile)]);
}
