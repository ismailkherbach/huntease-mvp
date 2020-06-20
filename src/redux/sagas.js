import { all } from "redux-saga/effects";
import authSagas from "./auth/saga";
import dashboardSagas from "./app/dashboard/saga";
import teamSagas from "./app/team/saga";
import guideSagas from "./app/guide/saga";
import callSagas from "./app/calls/saga";
import settingSagas from "./settings/saga";
import paymentSaga from "./app/payment/saga";
export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    dashboardSagas(),
    teamSagas(),
    guideSagas(),
    callSagas(),
    settingSagas(),
    paymentSaga(),
  ]);
}
