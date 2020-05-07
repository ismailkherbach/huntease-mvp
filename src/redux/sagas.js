import { all } from "redux-saga/effects";
import authSagas from "./auth/saga";
import dashboardSagas from "./app/dashboard/saga";
import teamSagas from "./app/team/saga";
export default function* rootSaga(getState) {
  yield all([authSagas(), dashboardSagas(), teamSagas()]);
}
