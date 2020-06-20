import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  ADD_TEAM_MEMBER,
  GET_TEAM_MEMBER,
  DELETE_TEAM_MEMBER,
  CHANGE_NAME,
} from "../../actions";
import axios from "axios";
import {
  addTeamSuccess,
  getTeamMembersSuccess,
  deleteTeamSuccess,
  changeNameResponseSuccess,
} from "./actions";
import { API_URL } from "../../../utils/utils";

const BASIC_URL = "https://huntease-mvp.herokuapp.com/v1/";
const token_bearer = JSON.parse(localStorage.getItem("user_id"));
const CREDENTIALS = {
  tokenBearer: JSON.parse(localStorage.getItem("user_id")),
  domainName: JSON.parse(localStorage.getItem("domain")),
};
const addTeamMemberAsync = async (firstName, lastName, emailPro) =>
  await axios({
    method: "post",
    url: API_URL + `user/`,
    data: {
      firstName,
      lastName,
      email: emailPro,
    },
    headers: {
      authorization: CREDENTIALS["tokenBearer"],
    },
  });

function* addTeamMember({ payload }) {
  const { firstName, lastName, email } = payload;
  let emailPro = payload.email + "@" + CREDENTIALS["domainName"];

  try {
    const addResponse = yield call(
      addTeamMemberAsync,
      firstName,
      lastName,
      emailPro
    );
    if (addResponse.status == 201) {
      yield put(addTeamSuccess(addResponse));
    } else {
      console.log("add failed :", addResponse);
    }
  } catch (error) {
    console.log("add error : ", error);
  }
}

const changeNameResponseAsync = async (id, desicion) =>
  await axios({
    method: "get",
    url: API_URL + `requests/${id}/${desicion}`,

    headers: {
      authorization: CREDENTIALS["tokenBearer"],
    },
  });

function* changeNameResponse({ payload }) {
  const { id, desicion } = payload;

  try {
    const changeResponse = yield call(changeNameResponseAsync, id, desicion);
    if (changeResponse.status == 201) {
      yield put(changeNameResponseSuccess(changeResponse));
    } else {
      console.log("response failed :", changeResponse);
    }
  } catch (error) {
    console.log("response error : ", error);
  }
}

const getTeamMemberAsync = async () =>
  await axios({
    method: "get",
    url: API_URL + `team/`,

    headers: {
      authorization: CREDENTIALS["tokenBearer"],
    },
  });

function* getTeamMember({}) {
  // const { firstname, lastname, email } = payload;

  try {
    const getResponse = yield call(getTeamMemberAsync);
    if (getResponse.status == 200) {
      yield put(getTeamMembersSuccess(getResponse.data.team.users));
    } else {
      console.log("get failed :", getResponse);
    }
  } catch (error) {
    console.log("get error : ", error);
  }
}

export function* watchAddMember() {
  yield takeEvery(ADD_TEAM_MEMBER, addTeamMember);
}

export function* watchChangeResponse() {
  yield takeEvery(CHANGE_NAME, changeNameResponse);
}

export function* watchGetMember() {
  yield takeEvery(GET_TEAM_MEMBER, getTeamMember);
}

export default function* rootSaga() {
  yield all([
    fork(watchAddMember),
    fork(watchGetMember),
    fork(watchChangeResponse),
  ]);
}
