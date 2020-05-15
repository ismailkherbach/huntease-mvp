import {
  GET_LEADS,
  GET_LEADS_ERROR,
  GET_LEADS_SUCCESS,
  DELETE_LEADS,
  DELETE_LEADS_ERROR,
  DELETE_LEADS_SUCCESS,
} from "../../actions";

export const getLeads = () => ({
  type: GET_LEADS,
});

export const getLeadsSuccess = (leads) => ({
  type: GET_LEADS_SUCCESS,
  payload: leads,
});

export const getLeadsError = (error) => ({
  type: GET_LEADS_ERROR,
  payload: error,
});

export const deleteLeads = () => ({
  type: DELETE_LEADS,
});

export const deleteLeadsSuccess = (leads) => ({
  type: DELETE_LEADS_SUCCESS,
  payload: leads,
});

export const deleteLeadsError = (error) => ({
  type: DELETE_LEADS_ERROR,
  payload: error,
});
