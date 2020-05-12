import {
  GET_GUIDE,
  GET_GUIDE_SUCCESS,
  GET_GUIDE_ERROR,
  ADD_GUIDE,
  ADD_GUIDE_SUCCESS,
  ADD_GUIDE_ERROR,
  DELETE_GUIDE,
  DELETE_GUIDE_SUCCESS,
  DELETE_GUIDE_ERROR,
} from "../../actions";

const INIT_STATE = {
  error: "",
  guide: null,
  guides: null,
  loading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_GUIDE:
      return { ...state, loading: true, error: "" };
    case ADD_GUIDE_SUCCESS:
      return {
        ...state,
        loading: false,
        guide: action.payload,
        error: "",
      };
    case ADD_GUIDE_ERROR:
      return {
        ...state,
        loading: false,
        guide: "",
        error: action.payload,
      };
    case GET_GUIDE:
      return { ...state, loading: true, error: "" };
    case GET_GUIDE_SUCCESS:
      return {
        ...state,
        loading: false,
        guides: action.payload,
        error: "",
      };
    case GET_GUIDE_ERROR:
      return {
        ...state,
        loading: false,
        guides: "",
        error: action.payload,
      };

    case DELETE_GUIDE:
      return { ...state, loading: true, error: "" };
    case DELETE_GUIDE_SUCCESS:
      return {
        ...state,
        loading: false,
        guide: action.payload,
        error: "",
      };
    case DELETE_GUIDE_ERROR:
      return {
        ...state,
        loading: false,
        guide: "",
        error: action.payload,
      };

    default:
      return { ...state };
  }
};
