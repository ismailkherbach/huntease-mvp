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
  UPDATE_CARD,
  UPDATE_CARD_SUCCESS,
  UPDATE_CARD_ERROR,
  UPDATE_ADDRESS,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_ERROR,
  CANCEL_SUBSCRIPTION,
  CANCEL_SUBSCRIPTION_SUCCESS,
  CANCEL_SUBSCRIPTION_ERROR,
} from "../../actions";

const INIT_STATE = {
  error: "",
  loading: false,
  paymentHistory: null,
  discount: null,
  cardInfo: null,
  plans: null,
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

    case UPDATE_CARD:
      return { ...state, loading: true, error: "" };
    case UPDATE_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case UPDATE_CARD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_ADDRESS:
      return { ...state, loading: true, error: "" };
    case UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case UPDATE_ADDRESS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CANCEL_SUBSCRIPTION:
      return { ...state, loading: true, error: "" };
    case CANCEL_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case CANCEL_SUBSCRIPTION_ERROR:
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

    case GET_PLAN:
      return { ...state, loading: true, error: "" };
    case GET_PLAN_SUCCESS:
      return {
        ...state,
        loading: false,
        plans: action.payload,
        error: "",
      };
    case GET_PLAN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        plans: "",
      };

    case GET_CARD_INFO:
      return { ...state, loading: true, error: "" };
    case GET_CARD_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        cardInfo: action.payload,
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
