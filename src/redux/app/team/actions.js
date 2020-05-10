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
} from "../../actions";

export const getTeamMembers = () => ({
  type: GET_TEAM_MEMBER,
});

export const getTeamMembersSuccess = (item) => ({
  type: GET_TEAM_MEMBER_SUCCESS,
  payload: item,
});

export const getTeamMembersError = (error) => ({
  type: GET_TEAM_MEMBER_ERROR,
  payload: error,
});

export const addTeam = (member) => ({
  type: ADD_TEAM_MEMBER,
  payload: member,
});

export const addTeamSuccess = (member) => ({
  type: ADD_TEAM_MEMBER_SUCCESS,
  payload: member,
});

export const addTeamError = (error) => ({
  type: ADD_TEAM_MEMBER_ERROR,
  payload: error,
});

export const deleteTeam = (member) => ({
  type: DELETE_TEAM_MEMBER,
  payload: member,
});

export const deleteTeamSuccess = (member) => ({
  type: DELETE_TEAM_MEMBER_SUCCESS,
  payload: member,
});

export const deleteTeamError = (error) => ({
  type: DELETE_TEAM_MEMBER_ERROR,
  payload: error,
});
