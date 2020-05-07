import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  ADD_TEAM_MEMBER,
  GET_TEAM_MEMBER,
  DELETE_TEAM_MEMBER,
} from "../../actions";
import axios from "axios";
import { addTeamSuccess, getTeamSuccess, deleteTeamSuccess } from "./actions";

const addTeamMemberAsync = async (firstname, lastname, email) =>
  await axios({
    method: "post",
    url: "https://huntease-mvp.herokuapp.com/v1/user/",
    data: {
      email,
      firstname,
      lastname,
    },
    headers: {
      authorization: JSON.parse(localStorage.getItem("user_id")),
    },
  })
    .then((authUser) => console.log(authUser))
    .catch((error) => error);

function* addTeamMember({ payload }) {
  const { firstname, lastname, email } = payload;

  try {
    const addResponse = yield call(
      addTeamMemberAsync,
      firstname,
      lastname,
      email
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
    url: "https://huntease-mvp.herokuapp.com/v1/user/",

    headers: {
      authorization: JSON.parse(localStorage.getItem("user_id")),
    },
  })
    .then((authUser) => console.log(authUser))
    .catch((error) => error);

function* getTeamMember({}) {
  // const { firstname, lastname, email } = payload;

  try {
    const getResponse = yield call(addTeamMemberAsync);
    if (getResponse.status == 200) {
      yield put(getTeamSuccess(getResponse));
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
