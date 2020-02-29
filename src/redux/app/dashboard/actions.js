import {
  PERFORMANCE_LIST_GET,
  PERFORMANCE_LIST_GET_SUCCESS,
  PERFORMANCE_LIST_GET_ERROR,
  CALLS_LIST_GET,
  CALLS_LIST_GET_SUCCESS,
  CALLS_LIST_GET_ERROR,
  MEETINGS_LIST_GET,
  MEETINGS_LIST_GET_SUCCESS,
  MEETINGS_LIST_GET_ERROR,
  ENGAGEMENT_RATE,
  ENGAGEMENT_RATE_SUCCESS,
  ENGAGEMENT_RATE_ERROR,
  TEAM_LIST_ADD_MEMBER_ERROR,
  TEAM_LIST_ADD_MEMBER_SUCCESS,
  TEAM_LIST_ADD_MEMBER
} from "../../actions";

export const getPerformance = () => ({
  type: PERFORMANCE_LIST_GET
});

export const getCalls = () => ({
  type: CALLS_LIST_GET
});
export const getMeetings = () => ({
  type: MEETINGS_LIST_GET
});
export const getEngagement = () => ({
  type: ENGAGEMENT_RATE
});

export const getPerformanceSuccess = item => ({
  type: PERFORMANCE_LIST_GET_SUCCESS,
  payload: item
});

export const getCallsSuccess = item => ({
  type: CALLS_LIST_GET_SUCCESS,
  payload: item
});

export const getMeetingsSuccess = item => ({
  type: MEETINGS_LIST_GET_SUCCESS,
  payload: item
});

export const getEngagementSuccess = item => ({
  type: ENGAGEMENT_RATE_SUCCESS,
  payload: item
});

export const getPerformanceError = error => ({
  type: PERFORMANCE_LIST_GET_ERROR,
  payload: error
});

export const getCallsError = error => ({
  type: CALLS_LIST_GET_ERROR,
  payload: error
});

export const getMeetingsError = error => ({
  type: MEETINGS_LIST_GET_ERROR,
  payload: error
});

export const getEngagementError = error => ({
  type: ENGAGEMENT_RATE_ERROR,
  payload: error
});

export const addTeamMember = item => ({
  type: TEAM_LIST_ADD_MEMBER,
  payload: item
});

export const addTeamMemberSuccess = items => ({
  type: TEAM_LIST_ADD_MEMBER_SUCCESS,
  payload: items
});

export const addTeamMemberError = error => ({
  type: TEAM_LIST_ADD_MEMBER_ERROR,
  payload: error
});
