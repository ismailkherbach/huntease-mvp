import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { GET_LEADS, DELETE_LEADS } from "../../actions";
import axios from "axios";
import { getLeadsSuccess, deleteLeadsSuccess } from "./actions";
const BASIC_URL = "https://huntease-mvp.herokuapp.com/v1/";
const CREDENTIALS = {
  tokenBearer: JSON.parse(localStorage.getItem("user_id")),
};
const getLeadsAsync = async () =>
  await axios({
    method: "get",
    url: `${BASIC_URL}/leads/`,
    headers: {
      authorization: CREDENTIALS["tokenBearer"],
    },
  })
    .then((authUser) => authUser)
    .catch((error) => error);

function* getLeads({ payload }) {
  try {
    const getResponse = yield call(getLeadsAsync);
    if (getResponse.status == 200) {
      yield put(getLeadsSuccess(getResponse));
    } else {
      console.log("get failed :", getResponse);
    }
  } catch (error) {
    console.log("get error : ", error);
  }
}

const deleteLeadsAsync = async (lead) =>
  await axios({
    method: "delete",
    url: `${BASIC_URL}/leads/`,
    data: lead,
    headers: {
      authorization: CREDENTIALS["tokenBearer"],
    },
  })
    .then((authUser) => authUser)
    .catch((error) => error);

function* deleteLeads({ payload }) {
  const { leads } = payload;

  try {
    const deleteResponse = yield call(deleteLeadsAsync, lead);
    if (deleteResponse.status == 200) {
      yield put(deleteLeadsSuccess(deleteResponse));
    } else {
      console.log("delete failed :", deleteResponse);
    }
  } catch (error) {
    console.log("delete error : ", error);
  }
}

export function* watchGetLeads() {
  yield takeEvery(GET_LEADS, getLeads);
}

export function* watchDeleteLeads() {
  yield takeEvery(DELETE_LEADS, deleteLeads);
}

export default function* rootSaga() {
  yield all([fork(watchGetLeads), fork(watchDeleteLeads)]);
}
