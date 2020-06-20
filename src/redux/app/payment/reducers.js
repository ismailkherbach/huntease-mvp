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
} from "../../actions";

const INIT_STATE = {
  error: "",
  loading: false,
  paymentHistory: null,
  discount: null,
  cardInfo: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PAY:
      return { ...state, loading: true, error: "" };
    case PAY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case PAY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_PAIMENT_HISTORY:
      return { ...state, loading: true, error: "" };
    case GET_PAIMENT_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        paymentHistory: action.payload,
        error: "",
      };
    case GET_PAIMENT_HISTORY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        paymentHistory: "",
      };

    case GET_CARD_INFO:
      return { ...state, loading: true, error: "" };
    case GET_CARD_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        cardInfo: action.payload.last4,
        error: "",
      };
    case GET_CARD_INFO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        cardInfos: "",
      };

    case APPLY_DISCOUNT:
      return { ...state, loading: true, error: "" };
    case APPLY_DISCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        discount: action.payload,
        error: "",
      };
    case APPLY_DISCOUNT_ERROR:
      return {
        ...state,
        loading: false,
        discount: "",
        error: action.payload,
      };
    default:
      return { ...state };
  }
};
