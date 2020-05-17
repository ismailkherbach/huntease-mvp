import { all } from "redux-saga/effects";
import authSagas from "./auth/saga";
import dashboardSagas from "./app/dashboard/saga";
import teamSagas from "./app/team/saga";
import guideSagas from "./app/guide/saga";
import callSagas from "./app/calls/saga";
export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    dashboardSagas(),
    teamSagas(),
    guideSagas(),
    callSagas(),
  ]);
}
