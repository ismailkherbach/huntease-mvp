import {
  GET_LEADS,
  GET_LEADS_ERROR,
  GET_LEADS_SUCCESS,
  SYNC_LEADS,
  SYNC_LEADS_ERROR,
  SYNC_LEADS_SUCCESS,
  DELETE_LEADS,
  DELETE_LEADS_ERROR,
  DELETE_LEADS_SUCCESS,
  INTEGRATE_HUBSPOT,
  INTEGRATE_HUBSPOT_ERROR,
  INTEGRATE_HUBSPOT_SUCCESS,
  GET_INTEGRATION,
  GET_INTEGRATION_ERROR,
  GET_INTEGRATION_SUCCESS,
  DELETE_INTEGRATION,
  DELETE_INTEGRATION_ERROR,
  DELETE_INTEGRATION_SUCCESS,
  LEADS_LIST_SELECTED_ITEMS_CHANGE,
  ENDING_CALL,
  GET_SCHEDULES,
  GET_SCHEDULES_SUCCESS,
  GET_SCHEDULES_ERROR,
  ADD_SCHEDULES,
  ADD_SCHEDULES_SUCCESS,
  ADD_SCHEDULES_ERROR,
  DISPATCH_LEAD_STATUS,
  EXPORT_CALL,
  EXPORT_CALL_SUCCESS,
  EXPORT_CALL_ERROR,
} from "../../actions";

export const endCall = (callInfos) => ({
  type: ENDING_CALL,
  payload: callInfos,
});

export const changeLeadStatus = (leadStatus) => ({
  type: DISPATCH_LEAD_STATUS,
  payload: leadStatus,
});

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

export const getSchedules = () => ({
  type: GET_SCHEDULES,
});

export const getSchedulesSuccess = (schedules) => ({
  type: GET_SCHEDULES_SUCCESS,
  payload: schedules,
});

export const getSchedulesError = (error) => ({
  type: GET_SCHEDULES_ERROR,
  payload: error,
});

export const addSchedules = (guide) => ({
  type: ADD_SCHEDULES,
  payload: guide,
});

export const addSchedulesSuccess = (guide) => ({
  type: ADD_SCHEDULES_SUCCESS,
  payload: guide,
});

export const addSchedulesError = (error) => ({
  type: ADD_SCHEDULES_ERROR,
  payload: error,
});

export const sendToHubspot = (callInfos) => ({
  type: EXPORT_CALL,
  payload: callInfos,
});

export const sendToHubspotSuccess = (callInfos) => ({
  type: EXPORT_CALL_SUCCESS,
  payload: callInfos,
});

export const sendToHubspotError = (error) => ({
  type: EXPORT_CALL_ERROR,
  payload: error,
});

export const syncLeads = () => ({
  type: SYNC_LEADS,
});

export const syncLeadsSuccess = (leads) => ({
  type: SYNC_LEADS_SUCCESS,
  payload: leads,
});

export const syncLeadsError = (error) => ({
  type: SYNC_LEADS_ERROR,
  payload: error,
});

export const deleteLeads = (lead) => ({
  type: DELETE_LEADS,
  payload: lead,
});

export const deleteLeadsSuccess = (leads) => ({
  type: DELETE_LEADS_SUCCESS,
  payload: leads,
});

export const deleteLeadsError = (error) => ({
  type: DELETE_LEADS_ERROR,
  payload: error,
});

export const integrateHubspot = (apiKey) => ({
  type: INTEGRATE_HUBSPOT,
  payload: { apiKey },
});

export const integrateHubspotSuccess = (integration) => ({
  type: INTEGRATE_HUBSPOT_SUCCESS,
  payload: integration,
});

export const integrateHubspotError = (error) => ({
  type: INTEGRATE_HUBSPOT_ERROR,
  payload: error,
});

export const getIntegrations = () => ({
  type: GET_INTEGRATION,
});

export const getIntegrationsSuccess = (integrationStatus) => ({
  type: GET_INTEGRATION_SUCCESS,
  payload: integrationStatus,
});

export const getIntegrationsError = (error) => ({
  type: GET_INTEGRATION_ERROR,
  payload: error,
});

export const deleteIntegration = () => ({
  type: DELETE_INTEGRATION,
});

export const deleteIntegrationSuccess = (integration) => ({
  type: DELETE_INTEGRATION_SUCCESS,
  payload: integration,
});

export const dleteIntegrationError = (error) => ({
  type: DELETE_INTEGRATION_ERROR,
  payload: error,
});

export const selectedLeadsItemsChange = (selectedItems) => ({
  type: LEADS_LIST_SELECTED_ITEMS_CHANGE,
  payload: selectedItems,
});
