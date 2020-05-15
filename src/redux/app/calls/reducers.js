import {
  GET_LEADS,
  GET_LEADS_ERROR,
  GET_LEADS_SUCCESS,
  DELETE_LEADS,
  DELETE_LEADS_ERROR,
  DELETE_LEADS_SUCCESS,
} from "../../actions";

const INIT_STATE = {
  error: "",
  lead: null,
  leads: null,
  loading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_LEADS:
      return { ...state, loading: true, error: "" };
    case GET_LEADS_SUCCESS:
      return {
        ...state,
        loading: false,
        leads: action.payload,
        error: "",
      };
    case GET_LEADS_ERROR:
      return {
        ...state,
        loading: false,
        leads: "",
        error: action.payload,
      };

    case DELETE_LEADS:
      return { ...state, loading: true, error: "" };
    case DELETE_LEADS_SUCCESS:
      return {
        ...state,
        loading: false,
        lead: action.payload,
        error: "",
      };
    case DELETE_LEADS_ERROR:
      return {
        ...state,
        loading: false,
        lead: "",
        error: action.payload,
      };

    default:
      return { ...state };
  }
};
