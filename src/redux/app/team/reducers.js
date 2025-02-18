import {
  GET_TEAM_MEMBER,
  GET_TEAM_MEMBER_ERROR,
  GET_TEAM_MEMBER_SUCCESS,
  ADD_TEAM_MEMBER,
  ADD_TEAM_MEMBER_ERROR,
  ADD_TEAM_MEMBER_SUCCESS,
  DELETE_TEAM_MEMBER,
  DELETE_TEAM_MEMBER_ERROR,
  DELETE_TEAM_MEMBER_SUCCESS,
  CHANGE_NAME,
  CHANGE_NAME_ERROR,
  CHANGE_NAME_SUCCESS,
} from "../../actions";

const INIT_STATE = {
  error: "",
  teamMember: null,
  teamMembers: null,
  loading: false,
  desicion: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_TEAM_MEMBER:
      return { ...state, loading: true, error: "" };
    case ADD_TEAM_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        teamMember: action.payload,
        error: "",
      };
    case ADD_TEAM_MEMBER_ERROR:
      return {
        ...state,
        loading: false,
        teamMember: "",
        error: action.payload,
      };

    case CHANGE_NAME:
      return { ...state, loading: true, error: "" };
    case CHANGE_NAME_SUCCESS:
      return {
        ...state,
        loading: false,
        desicion: action.payload,
        error: "",
      };
    case CHANGE_NAME_ERROR:
      return {
        ...state,
        loading: false,
        desicion: "",
        error: action.payload,
      };

    case GET_TEAM_MEMBER:
      return { ...state, loading: true, error: "" };
    case GET_TEAM_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        teamMembers: action.payload,
        error: "",
      };
    case GET_TEAM_MEMBER_ERROR:
      return {
        ...state,
        loading: false,
        teamMembers: "",
        error: action.payload,
      };

    case DELETE_TEAM_MEMBER:
      return { ...state, loading: true, error: "" };
    case DELETE_TEAM_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        teamMember: action.payload,
        error: "",
      };
    case DELETE_TEAM_MEMBER_ERROR:
      return {
        ...state,
        loading: false,
        teamMember: "",
        error: action.payload,
      };

    default:
      return { ...state };
  }
};
