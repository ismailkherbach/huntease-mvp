import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  ADD_GUIDE,
  GET_GUIDE,
  UPDATE_GUIDE,
  DELETE_GUIDE,
} from "../../actions";
import axios from "axios";
import { addGuideSuccess, getGuideSuccess, deleteGuide } from "./actions";
const BASIC_URL = "https://huntease-mvp.herokuapp.com/v1/";
const addGuideAsync = async (title, questions) =>
  await axios({
    method: "post",
    url: `${BASIC_URL}/guide/`,
    data: {
      title,
      questions,
      tags: ["CEO"],
    },
    headers: {
      authorization: JSON.parse(localStorage.getItem("user_id")),
    },
  })
    .then((authUser) => console.log(authUser))
    .catch((error) => error);

function* addGuideNew({ payload }) {
  const { title, questions } = payload;
  console.log(payload);
  try {
    const addResponse = yield call(addGuideAsync, title, questions);
    if (addResponse.status == 201) {
      yield put(addGuideSuccess(addResponse));
    } else {
      console.log("add failed :", addResponse);
    }
  } catch (error) {
    console.log("add error : ", error);
  }
}

const getGuideAsync = async () =>
  await axios({
    method: "get",
    url: `${BASIC_URL}/guide/`,

    headers: {
      authorization: JSON.parse(localStorage.getItem("user_id")),
    },
  })
    .then((authUser) => authUser)
    .catch((error) => error);

function* getGuideList({}) {
  // const { firstname, lastname, email } = payload;

  try {
    const getResponse = yield call(getGuideAsync);
    if (getResponse.status == 200) {
      yield put(getGuideSuccess(getResponse.data.guides));
    } else {
      console.log("get failed :", getResponse);
    }
  } catch (error) {
    console.log("get error : ", error);
  }
}

const updateGuideAsync = async (title, questions, id) =>
  await axios({
    method: "put",
    url: `${BASIC_URL}/guide/${id}`,
    data: {
      title,
      questions,
      tags: ["CEO"],
    },
    headers: {
      authorization: JSON.parse(localStorage.getItem("user_id")),
    },
  })
    .then((authUser) => console.log(authUser))
    .catch((error) => error);

function* updateGuide({ payload }) {
  const { title, questions, id } = payload;
  console.log(payload);
  try {
    const updateResponse = yield call(updateGuideAsync, title, questions);
    if (updateResponse.status == 201) {
      yield put(addGuideSuccess(updateResponse));
    } else {
      console.log("update failed :", updateResponse);
    }
  } catch (error) {
    console.log("update error : ", error);
  }
}

export function* watchAddGuide() {
  yield takeEvery(ADD_GUIDE, addGuideNew);
}

export function* watchGetGuide() {
  yield takeEvery(GET_GUIDE, getGuideList);
}

export function* watchUpdateGuide() {
  yield takeEvery(UPDATE_GUIDE, updateGuide);
}

export default function* rootSaga() {
  yield all([fork(watchAddGuide), fork(watchGetGuide), watchUpdateGuide()]);
}
