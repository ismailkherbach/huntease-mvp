import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getDateWithFormat } from "../../../helpers/Utils";

import {
  PERFORMANCE_LIST_GET,
  CALLS_LIST_GET,
  ENGAGEMENT_RATE,
  TEAM_LIST_ADD_MEMBER,
  TEAM_LIST_GET_MEMBER
} from "../../actions";

import {
  getPerformanceSuccess,
  getPerformanceError,
  getCallsSuccess,
  getCallsError,
  getEngagementSuccess,
  getEngagementError,
  addTeamMemberSuccess,
  addTeamMemberError,
  getTeamSuccess,
  getTeamError
} from "./actions";

import performanceList from "../../../data/performance";
import calls from "../../../data/calls";
import engagement from "../../../data/engagements";
import team from "../../../data/team";
import topsales from "../../../data/topsales";

const getPerformanceListRequest = async () => {
  return await new Promise((success, fail) => {
    setTimeout(() => {
      success(performanceList);
    }, 1000);
  })
    .then(response => response)
    .catch(error => error);
};

function* getPerformanceListItems() {
  try {
    const response = yield call(getPerformanceListRequest);
    yield put(getPerformanceSuccess(response));
  } catch (error) {
    yield put(getPerformanceError(error));
  }
}

const getCallsListRequest = async () => {
  return await new Promise((success, fail) => {
    setTimeout(() => {
      success(calls);
    }, 1000);
  })
    .then(response => response)
    .catch(error => error);
};

function* getCallsListItems() {
  try {
    const response = yield call(getCallsListRequest);
    yield put(getCallsSuccess(response));
  } catch (error) {
    yield put(getCallsError(error));
  }
}

const getEngagementRequest = async () => {
  return await new Promise((success, fail) => {
    setTimeout(() => {
      success(engagement);
    }, 1000);
  })
    .then(response => response)
    .catch(error => error);
};

function* getEngagement() {
  try {
    const response = yield call(getEngagementRequest);
    yield put(getEngagementSuccess(response));
  } catch (error) {
    yield put(getEngagementError(error));
  }
}

const getTopsalesRequest = async () => {
  return await new Promise((success, fail) => {
    setTimeout(() => {
      success(topsales);
    }, 1000);
  })
    .then(response => response.topSalers)
    .catch(error => error);
};

function* getTopsales() {
  try {
    const response = yield call(getTopsalesRequest);
    yield put(getTeamSuccess(response));
  } catch (error) {
    yield put(getTeamError(error));
  }
}

const addTeamMemberRequest = async item => {
  let items = team.team;
  item.id = items.length + 1;
  item.addDate = getDateWithFormat();
  items.splice(0, 0, item);
  return await new Promise((success, fail) => {
    setTimeout(() => {
      success(items);
    }, 1000);
  })
    .then(response => console.log(response))
    .catch(error => error);
};

function* addTeamMember({ payload }) {
  try {
    const response = yield call(addTeamMemberRequest, payload);
    yield put(addTeamMemberSuccess(response));
  } catch (error) {
    yield put(addTeamMemberError(error));
  }
}

export function* watchGetPerformance() {
  yield takeEvery(PERFORMANCE_LIST_GET, getPerformanceListItems);
}

export function* watchGetCalls() {
  yield takeEvery(CALLS_LIST_GET, getCallsListItems);
}

export function* watchGetEngagement() {
  yield takeEvery(ENGAGEMENT_RATE, getEngagement);
}
export function* watchAddTeam() {
  yield takeEvery(TEAM_LIST_ADD_MEMBER, addTeamMember);
}
export function* watchGetTeam() {
  yield takeEvery(TEAM_LIST_GET_MEMBER, getTopsales);
}
export default function* rootSaga() {
  yield all([
    fork(watchGetPerformance),
    fork(watchGetCalls),
    fork(watchGetEngagement),
    fork(watchAddTeam),
    fork(watchGetTeam)
  ]);
}
