import {
  PERFORMANCE_LIST_GET,
  PERFORMANCE_LIST_GET_SUCCESS,
  PERFORMANCE_LIST_GET_ERROR,
  CALLS_LIST_GET,
  CALLS_LIST_GET_ERROR,
  CALLS_LIST_GET_SUCCESS,
  ENGAGEMENT_RATE,
  ENGAGEMENT_RATE_SUCCESS,
  ENGAGEMENT_RATE_ERROR,
  TEAM_LIST_ADD_MEMBER_ERROR,
  TEAM_LIST_ADD_MEMBER_SUCCESS,
  TEAM_LIST_ADD_MEMBER,
  TEAM_LIST_GET_MEMBER,
  TEAM_LIST_GET_MEMBER_SUCCESS,
  TEAM_LIST_GET_MEMBER_ERROR,
  MEETINGS_LIST_GET,
  MEETINGS_LIST_GET_SUCCESS,
  MEETINGS_LIST_GET_ERROR,
} from "../../actions";

const INIT_STATE = {
  error: "",
  teamMembers: null,
  allTeamMembers: null,
  performanceData: null,
  callData: null,
  callsLables: [],
  callsData: [],
  labels: [],
  data: [],
  barData: [],
  barLabels: [],
  loading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PERFORMANCE_LIST_GET:
      return { ...state, loading: false };
    case PERFORMANCE_LIST_GET_SUCCESS:
      return {
        ...state,
        loading: true,
        performanceData: action.payload,
        lineLabels: action.payload.labels,
        lineData: action.payload.data,
      };
    case PERFORMANCE_LIST_GET_ERROR:
      return { ...state, loading: true, error: action.payload };
    case CALLS_LIST_GET:
      return { ...state, loading: false };
    case CALLS_LIST_GET_SUCCESS:
      return {
        ...state,
        loading: true,
        callData: action.payload,
        barLabels: action.payload.labels,
        barData: action.payload.data,
      };
    case CALLS_LIST_GET_ERROR:
      return { ...state, loading: true, error: action.payload };

    case ENGAGEMENT_RATE:
      return { ...state, loading: false };
    case ENGAGEMENT_RATE_SUCCESS:
      return {
        ...state,
        loading: true,
        engagement: action.payload,
        callsPastTwo: action.payload.callsPastTwo,
        talkDuration: action.payload.talkDuration,
        answeredCalls: action.payload.answeredCalls,
        conversionRate: action.payload.conversionRate,
      };
    case ENGAGEMENT_RATE_ERROR:
      return { ...state, loading: true, error: action.payload };

    case TEAM_LIST_ADD_MEMBER:
      return { ...state, loading: false };

    case TEAM_LIST_ADD_MEMBER_SUCCESS:
      return {
        ...state,
        loading: true,
        allTeamMembers: action.payload,
        teamMembers: action.payload,
      };

    case TEAM_LIST_ADD_MEMBER_ERROR:
      return { ...state, loading: true, error: action.payload };
    case TEAM_LIST_GET_MEMBER:
      return { ...state, loading: false };
    case TEAM_LIST_GET_MEMBER_SUCCESS:
      return { ...state, loading: true, topSales: action.payload };

    case TEAM_LIST_GET_MEMBER_ERROR:
      return { ...state, loading: true, error: action.payload };
    default:
      return { ...state };
  }
};
