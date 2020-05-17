import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_LEADS,
  DELETE_LEADS,
  SYNC_LEADS,
  INTEGRATE_HUBSPOT,
  GET_INTEGRATION,
} from "../../actions";
import axios from "axios";
import {
  getLeadsSuccess,
  deleteLeadsSuccess,
  syncLeadsSuccess,
  integrateHubspotSuccess,
  getIntegrationsSuccess,
  deleteIntegrationSuccess,
} from "./actions";
const BASIC_URL = "https://huntease-mvp.herokuapp.com/v1/";
const CREDENTIALS = {
  tokenBearer: JSON.parse(localStorage.getItem("user_id")),
};
const getLeadsAsync = async () =>
  await axios({
    method: "get",
    url: `${BASIC_URL}/lead/`,
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
      yield put(getLeadsSuccess(getResponse.data.leads));
    } else {
      console.log("get failed :", getResponse);
    }
  } catch (error) {
    console.log("get error : ", error);
  }
}

const syncLeadsAsync = async () =>
  await axios({
    method: "get",
    url: `${BASIC_URL}/integration/sync`,
    headers: {
      authorization: CREDENTIALS["tokenBearer"],
    },
  })
    .then((authUser) => authUser)
    .catch((error) => error);

function* syncLeads({ payload }) {
  try {
    const syncResponse = yield call(syncLeadsAsync);
    if (syncResponse.status == 200) {
      yield put(syncLeadsSuccess(syncResponse));
    } else {
      console.log("sync failed :", syncResponse);
    }
  } catch (error) {
    console.log("sync error : ", error);
  }
}

const deleteLeadsAsync = async (lead) =>
  await axios({
    method: "delete",
    url: `${BASIC_URL}/lead/${lead}`,
    headers: {
      authorization: CREDENTIALS["tokenBearer"],
    },
  })
    .then((authUser) => authUser)
    .catch((error) => error);

function* deleteLeads({ payload }) {
  const { lead } = payload;

  try {
    const deleteResponse = yield call(deleteLeadsAsync, lead);
    if (deleteResponse.status == 204) {
      yield put(deleteLeadsSuccess(deleteResponse));
    } else {
      console.log("delete failed :", deleteResponse);
    }
  } catch (error) {
    console.log("delete error : ", error);
  }
}

const integrateHubspotAsync = async (apiKey) =>
  await axios({
    method: "post",
    url: `${BASIC_URL}/integration/`,
    data: {
      key: apiKey,
    },
    headers: {
      authorization: CREDENTIALS["tokenBearer"],
    },
  })
    .then((authUser) => authUser)
    .catch((error) => error);

function* integrateHubspot({ payload }) {
  const { apiKey } = payload.apiKey;
  console.log(apiKey);
  console.log(CREDENTIALS["tokenBearer"]);
  try {
    const integrationResponse = yield call(integrateHubspotAsync, apiKey);
    if (integrationResponse.status == 201) {
      yield put(integrateHubspotSuccess("success"));
    } else {
      console.log("integration failed :", integrationResponse);
    }
  } catch (error) {
    console.log("integration error : ", error);
  }
}

const getIntegrationAsync = async () =>
  await axios({
    method: "get",
    url: `${BASIC_URL}/integration/`,
    headers: {
      authorization: CREDENTIALS["tokenBearer"],
    },
  })
    .then((authUser) => authUser)
    .catch((error) => error);

function* getIntegration({ payload }) {
  try {
    const getIntegrationResponse = yield call(getIntegrationAsync);
    console.log(getIntegrationResponse.data.type);
    if (getIntegrationResponse.status == 200) {
      yield put(getIntegrationsSuccess(getIntegrationResponse.data.type));
    } else {
      console.log("get integration failed :", getIntegrationResponse);
    }
  } catch (error) {
    console.log(" getintegration error : ", error);
  }
}

const deleteIntegrationAsync = async () =>
  await axios({
    method: "delete",
    url: `${BASIC_URL}/integration`,
    headers: {
      authorization: CREDENTIALS["tokenBearer"],
    },
  })
    .then((authUser) => authUser)
    .catch((error) => error);

function* deleteIntegration({ payload }) {
  try {
    const deleteResponse = yield call(deleteIntegrationAsync);
    if (deleteResponse.status == 204) {
      yield put(deleteIntegrationSuccess(deleteResponse));
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
export function* watchSyncLeads() {
  yield takeEvery(SYNC_LEADS, syncLeads);
}

export function* watchDeleteLeads() {
  yield takeEvery(DELETE_LEADS, deleteLeads);
}

export function* watchIntegrationHubspot() {
  yield takeEvery(INTEGRATE_HUBSPOT, integrateHubspot);
}
export function* watchGetIntegration() {
  yield takeEvery(GET_INTEGRATION, getIntegration);
}
export function* watchDeleteIntegration() {
  yield takeEvery(GET_INTEGRATION, getIntegration);
}
export default function* rootSaga() {
  yield all([
    fork(watchGetLeads),
    fork(watchSyncLeads),
    fork(watchDeleteLeads),
    fork(watchIntegrationHubspot),
    fork(watchGetIntegration),
    fork(watchDeleteIntegration),
  ]);
}
