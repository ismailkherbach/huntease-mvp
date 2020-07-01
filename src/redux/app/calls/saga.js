import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_LEADS,
  DELETE_LEADS,
  SYNC_LEADS,
  INTEGRATE_HUBSPOT,
  GET_INTEGRATION,
  DELETE_INTEGRATION,
  GET_SCHEDULES,
  ADD_SCHEDULES,
  EXPORT_CALL,
} from "../../actions";
import axios from "axios";
import {
  getLeadsSuccess,
  deleteLeadsSuccess,
  syncLeadsSuccess,
  integrateHubspotSuccess,
  getIntegrationsSuccess,
  deleteIntegrationSuccess,
  getIntegrationsError,
  getSchedulesSuccess,
  integrateHubspotError,
  addSchedulesSuccess,
  sendToHubspotSuccess,
  sendToHubspotError,
} from "./actions";
import { API_URL } from "../../../utils/utils";

const BASIC_URL = "https://huntease-mvp.herokuapp.com/v1";
const CREDENTIALS = {
  tokenBearer: JSON.parse(localStorage.getItem("user_id")),
};
const getLeadsAsync = async () =>
  await axios({
    method: "get",
    url: API_URL + `lead/`,
    headers: {
      authorization: CREDENTIALS["tokenBearer"],
    },
  });
const pullLeadsAysnc = async () =>
  await axios({
    method: "get",
    url: API_URL + `integration/sync`,
    headers: {
      authorization: CREDENTIALS["tokenBearer"],
    },
  });
function* getLeads({ payload }) {
  try {
    const getResponse = yield call(getLeadsAsync);
    //yield call(pullLeadsAysnc);

    if (getResponse.status == 200) {
      yield put(getLeadsSuccess(getResponse.data.leads));
    } else {
      console.log("get failed :", getResponse);
    }
  } catch (error) {
    console.log("get error : ", error);
  }
}

const getSchedulesAsync = async () =>
  await axios({
    method: "get",
    url: API_URL + `schedules/`,
    headers: {
      authorization: CREDENTIALS["tokenBearer"],
    },
  });
function* getSchedules({ payload }) {
  try {
    const getResponse = yield call(getSchedulesAsync);
    //yield call(pullLeadsAysnc);

    if (getResponse.status == 200) {
      yield put(getSchedulesSuccess(getResponse.data.data));
      console.log(getResponse.data);
    } else {
      console.log("get failed :", getResponse);
    }
  } catch (error) {
    console.log("get error : ", error);
  }
}

const addSchedulesAsync = async (name, link) =>
  await axios({
    method: "post",
    url: API_URL + `schedules/`,
    data: {
      name: name,
      link: link,
    },
    headers: {
      authorization: CREDENTIALS["tokenBearer"],
    },
  });
function* addSchedules({ payload }) {
  const { name, link } = payload;
  try {
    const addResponse = yield call(addSchedulesAsync, name, link);
    //yield call(pullLeadsAysnc);

    if (addResponse.status == 201) {
      yield put(addSchedulesSuccess(addResponse));
      console.log(addResponse);
    } else {
      console.log("get failed :", addResponse);
    }
  } catch (error) {
    console.log("get error : ", error);
  }
}

const exportCallAsync = async (
  CallSid,
  leadId,
  notes,
  save_recording,
  lead_status
) =>
  await axios({
    method: "post",
    url: API_URL + "integration/postCall",
    data: {
      CallSid: CallSid,
      leadId: leadId,
      notes: notes,
      save_recording: save_recording,
      lead_status: lead_status,
    },
    headers: {
      authorization: CREDENTIALS["tokenBearer"],
    },
  });
function* exportCall({ payload }) {
  const { CallSid, leadId, notes, save_recording, lead_status } = payload;
  console.log(payload);
  try {
    const addResponse = yield call(
      exportCallAsync,
      CallSid,
      leadId,
      notes,
      save_recording,
      lead_status
    );
    console.log(addResponse);

    //yield call(pullLeadsAysnc);

    if (addResponse.status == 201) {
      yield put(addSchedulesSuccess(addResponse));
      console.log(addResponse);
    } else {
      console.log("add failed :", addResponse);
    }
  } catch (error) {
    console.log("add error : ", error);
  }
}

const syncLeadsAsync = async () =>
  await axios({
    method: "get",
    url: API_URL + `integration/sync`,
    headers: {
      authorization: CREDENTIALS["tokenBearer"],
    },
  });

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
    url: API_URL + `lead/${lead}`,
    headers: {
      authorization: CREDENTIALS["tokenBearer"],
    },
  });

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
    url: API_URL + `integration/`,
    data: {
      key: apiKey,
    },
    headers: {
      authorization: CREDENTIALS["tokenBearer"],
    },
  });

function* integrateHubspot({ payload }) {
  const { apiKey } = payload.apiKey;
  console.log(apiKey);
  console.log(CREDENTIALS["tokenBearer"]);
  try {
    const integrationResponse = yield call(integrateHubspotAsync, apiKey);
    if (integrationResponse.status == 201) {
      yield put(integrateHubspotSuccess("success"));
      // yield call(pullLeadsAysnc);
    } else {
      console.log("integration failed :", integrationResponse);
    }
  } catch (error) {
    if (error.response.status == 422) {
      console.log("You don't have any integrations");
      yield put(integrateHubspotError("You don't have any integrations"));
    }
    console.log("integration error : ", error);
  }
}

const getIntegrationAsync = async () =>
  await axios({
    method: "get",
    url: API_URL + `integration/`,
    headers: {
      authorization: CREDENTIALS["tokenBearer"],
    },
  });

function* getIntegration({ payload }) {
  try {
    const getIntegrationResponse = yield call(getIntegrationAsync);
    console.log(getIntegrationResponse.data);
    if (getIntegrationResponse.status == 200) {
      yield put(getIntegrationsSuccess(getIntegrationResponse.data.type));
    }
  } catch (error) {
    if (error.response.status == 404) {
      console.log("You don't have any integrations");
      yield put(getIntegrationsError("You don't have any integrations"));
    }

    yield put(getIntegrationsError("You don't have any integrations"));

    console.log(" getintegration error : ", error.response);
  }
}

const deleteIntegrationAsync = async () =>
  await axios({
    method: "delete",
    url: API_URL + `integration`,
    headers: {
      authorization: CREDENTIALS["tokenBearer"],
    },
  });

function* deleteIntegration({ payload }) {
  try {
    const deleteResponse = yield call(deleteIntegrationAsync);
    if (deleteResponse.status == 204) {
      yield put(deleteIntegrationSuccess(deleteResponse));
      window.location.reload();
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
export function* watchExportCall() {
  yield takeEvery(EXPORT_CALL, exportCall);
}
export function* watchGetSchedules() {
  yield takeEvery(GET_SCHEDULES, getSchedules);
}
export function* watchAddSchedules() {
  yield takeEvery(ADD_SCHEDULES, addSchedules);
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
  yield takeEvery(DELETE_INTEGRATION, deleteIntegration);
}
export default function* rootSaga() {
  yield all([
    fork(watchGetLeads),
    fork(watchSyncLeads),
    fork(watchDeleteLeads),
    fork(watchIntegrationHubspot),
    fork(watchGetIntegration),
    fork(watchDeleteIntegration),
    fork(watchGetSchedules),
    fork(watchAddSchedules),
    fork(watchExportCall),
  ]);
}
