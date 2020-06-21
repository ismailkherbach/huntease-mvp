import {
  PAY,
  PAY_ERROR,
  PAY_SUCCESS,
  GET_PAIMENT_HISTORY,
  GET_PAIMENT_HISTORY_ERROR,
  GET_PAIMENT_HISTORY_SUCCESS,
  APPLY_DISCOUNT,
  APPLY_DISCOUNT_ERROR,
  APPLY_DISCOUNT_SUCCESS,
  GET_CARD_INFO,
  GET_CARD_INFO_SUCCESS,
  GET_CARD_INFO_ERROR,
  GET_PLAN,
  GET_PLAN_SUCCESS,
  GET_PLAN_ERROR,
} from "../../actions";

export const getPaimentHistory = () => ({
  type: GET_PAIMENT_HISTORY,
});

export const getPaimentHistorySuccess = (paimentHistory) => ({
  type: GET_PAIMENT_HISTORY_SUCCESS,
  payload: paimentHistory,
});

export const getPaimentHistoryError = (error) => ({
  type: GET_PAIMENT_HISTORY_ERROR,
  payload: error,
});

export const getPlans = () => ({
  type: GET_PLAN,
});

export const getPlansSuccess = (plans) => ({
  type: GET_PLAN_SUCCESS,
  payload: plans,
});

export const getPlansError = (error) => ({
  type: GET_PLAN_ERROR,
  payload: error,
});

export const getCardInfo = () => ({
  type: GET_CARD_INFO,
});

export const getCardInfoSuccess = (card) => ({
  type: GET_CARD_INFO_SUCCESS,
  payload: card,
});

export const getCardInfoError = (error) => ({
  type: GET_CARD_INFO_ERROR,
  payload: error,
});

export const pay = (billing) => ({
  type: PAY,
  payload: billing,
});

export const paySuccess = (item) => ({
  type: PAY_SUCCESS,
  payload: item,
});

export const payError = (error) => ({
  type: PAY_ERROR,
  payload: error,
});

export const applyDiscount = ({ promoCode }) => ({
  type: APPLY_DISCOUNT,
  payload: { promoCode },
});

export const applyDiscountSuccess = (amount) => ({
  type: APPLY_DISCOUNT_SUCCESS,
  payload: amount,
});

export const applyDiscountError = (error) => ({
  type: APPLY_DISCOUNT_ERROR,
  payload: error,
});
