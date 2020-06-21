import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  PAY,
  GET_PAIMENT_HISTORY,
  APPLY_DISCOUNT,
  GET_CARD_INFO,
  GET_PLAN,
} from "../../actions";
import axios from "axios";
import {
  paySuccess,
  getPaimentHistorySuccess,
  applyDiscountSuccess,
  getCardInfoSuccess,
  getPlansSuccess,
} from "./actions";
import { API_URL } from "../../../utils/utils";

const paymentAsync = async (token, selectedPlan) =>
  await axios({
    method: "post",
    url: API_URL + `payments/`,
    data: {
      token,
      selectedPlan,
    },
    headers: {
      authorization: JSON.parse(localStorage.getItem("user_id")),
    },
  })
    .then((authUser) => authUser)
    .catch((error) => error);

function* paymnetSubscription({ payload }) {
  const { token, selectedPlan } = payload;
  console.log(payload);
  try {
    const payResponse = yield call(paymentAsync, token, selectedPlan);
    if (payResponse.status == 200) {
      yield put(paySuccess("Success"));
    } else {
      console.log("add failed :", payResponse);
    }
  } catch (error) {
    console.log("add error : ", error);
  }
}

const getPaymnetHistoryAsync = async () =>
  await axios({
    method: "get",
    url: API_URL + `payments/past-transcations/`,
    headers: {
      authorization: JSON.parse(localStorage.getItem("user_id")),
    },
  })
    .then((authUser) => authUser)
    .catch((error) => error);

function* getPaymnetHistory({ payload }) {
  try {
    const getHistoryResponse = yield call(getPaymnetHistoryAsync);
    if (getHistoryResponse.status == 200) {
      yield put(getPaimentHistorySuccess(getHistoryResponse));
    } else {
      console.log("get failed :", getHistoryResponse);
    }
  } catch (error) {
    console.log("get error : ", error);
  }
}

const getPlansAsync = async () =>
  await axios({
    method: "get",
    url: API_URL + `plans/`,
    headers: {
      authorization: JSON.parse(localStorage.getItem("user_id")),
    },
  })
    .then((authUser) => authUser)
    .catch((error) => error);

function* getPlans({ payload }) {
  try {
    const getPlansResponse = yield call(getPlansAsync);
    if (getPlansResponse.status == 200) {
      yield put(getPlansSuccess(getPlansResponse.data.plans));
      console.log(getPlansResponse.data);
    } else {
      console.log("get failed :", getPlansResponse);
    }
  } catch (error) {
    console.log("get error : ", error);
  }
}

const getCardInfoAsync = async () =>
  await axios({
    method: "get",
    url: API_URL + `payments/details`,
    headers: {
      authorization: JSON.parse(localStorage.getItem("user_id")),
    },
  })
    .then((authUser) => authUser)
    .catch((error) => error);

function* getCardInfo({ payload }) {
  try {
    const getcardResponse = yield call(getCardInfoAsync);
    if (getcardResponse.status == 200) {
      yield put(getCardInfoSuccess(getcardResponse.data));
      console.log(getcardResponse.data);
    } else {
      console.log("get failed :", getcardResponse);
    }
  } catch (error) {
    console.log("get error : ", error);
  }
}

const discountAsync = async (promoCode) =>
  await axios({
    method: "post",
    url: API_URL + `promos/check-code`,
    data: {
      code: promoCode,
    },
    headers: {
      authorization: JSON.parse(localStorage.getItem("user_id")),
    },
  })
    .then((authUser) => authUser)
    .catch((error) => error);

function* discount({ payload }) {
  const { promoCode } = payload;
  console.log(promoCode);
  try {
    const discountResponse = yield call(discountAsync, promoCode);
    if (discountResponse.status == 200 && discountResponse.data.valid) {
      yield put(applyDiscountSuccess(discountResponse.data.discount));
    } else {
      console.log("add failed :", discountResponse);
    }
  } catch (error) {
    console.log("add error : ", error);
  }
}

export function* watchPay() {
  yield takeEvery(PAY, paymnetSubscription);
}

export function* watchDiscount() {
  yield takeEvery(APPLY_DISCOUNT, discount);
}

export function* watchGetHistory() {
  yield takeEvery(GET_PAIMENT_HISTORY, getPaymnetHistory);
}

export function* watchGetCardInfo() {
  yield takeEvery(GET_CARD_INFO, getCardInfo);
}

export function* watchGetPlans() {
  yield takeEvery(GET_PLAN, getPlans);
}

export default function* rootSaga() {
  yield all([
    fork(watchPay),
    fork(watchDiscount),
    fork(watchGetHistory),
    fork(watchGetCardInfo),
    fork(watchGetPlans),
  ]);
}
