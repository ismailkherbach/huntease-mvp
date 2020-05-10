import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  ADD_TEAM_MEMBER,
  GET_TEAM_MEMBER,
  DELETE_TEAM_MEMBER,
} from "../../actions";
import axios from "axios";
import {
  addTeamSuccess,
  getTeamMembersSuccess,
  deleteTeamSuccess,
} from "./actions";

const addTeamMemberAsync = async (firstName, lastName, emailPro) =>
  await axios({
    method: "post",
    url: "https://huntease-mvp.herokuapp.com/v1/user/",
    data: {
      firstName,
      lastName,
      email: emailPro,
    },
    headers: {
      authorization: JSON.parse(localStorage.getItem("user_id")),
    },
  })
    .then((authUser) => authUser)
    .catch((error) => error);

function* addTeamMember({ payload }) {
  const { firstName, lastName, email } = payload;
  let emailPro =
    payload.email + "@" + JSON.parse(localStorage.getItem("domain"));

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

const getTeamMemberAsync = async () =>
  await axios({
    method: "get",
    url: "https://huntease-mvp.herokuapp.com/v1/team/",

    headers: {
      authorization: JSON.parse(localStorage.getItem("user_id")),
    },
  })
    .then((authUser) => authUser)
    .catch((error) => error);

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

export function* watchGetMember() {
  yield takeEvery(GET_TEAM_MEMBER, getTeamMember);
}

export default function* rootSaga() {
  yield all([fork(watchAddMember), fork(watchGetMember)]);
}
