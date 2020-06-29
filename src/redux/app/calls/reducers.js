import {
  GET_LEADS,
  GET_LEADS_ERROR,
  GET_LEADS_SUCCESS,
  DELETE_LEADS,
  SYNC_LEADS,
  SYNC_LEADS_ERROR,
  SYNC_LEADS_SUCCESS,
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
} from "../../actions";

const INIT_STATE = {
  error: "",
  lead: null,
  leads: null,
  loading: false,
  apiKey: null,
  integrationStatus: null,
  message: "",
  selectedItems: [],
  callEnded: false,
  isEmptyLeads: null,
  schedules: null,
  isEmptyschedules: null,
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
        isEmptyLeads: action.payload.length === 0 ? true : false,

        error: "",
      };
    case GET_LEADS_ERROR:
      return {
        ...state,
        loading: false,
        leads: "",
        error: action.payload,
      };
    case GET_SCHEDULES:
      return { ...state, loading: true, error: "" };
    case GET_SCHEDULES_SUCCESS:
      return {
        ...state,
        loading: false,
        schedules: action.payload,
        isEmptyschedules: action.payload.length === 0 ? true : false,
        error: "",
      };
    case GET_SCHEDULES_ERROR:
      return {
        ...state,
        loading: false,
        schedules: "",
        error: action.payload,
      };

    case ADD_SCHEDULES:
      return { ...state, loading: true, error: "" };
    case ADD_SCHEDULES_SUCCESS:
      return {
        ...state,
        loading: false,
        schedule: action.payload,
        error: "",
      };
    case ADD_SCHEDULES_ERROR:
      return {
        ...state,
        loading: false,
        schedule: "",
        error: action.payload,
      };

    case SYNC_LEADS:
      return { ...state, loading: true, error: "" };
    case SYNC_LEADS_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: "",
      };
    case SYNC_LEADS_ERROR:
      return {
        ...state,
        loading: false,
        message: "",
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
    case INTEGRATE_HUBSPOT:
      return { ...state, loading: true, error: "" };
    case INTEGRATE_HUBSPOT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: "",
      };
    case INTEGRATE_HUBSPOT_ERROR:
      return {
        ...state,
        loading: false,
        apiKey: "",
        error: action.payload,
      };
    case GET_INTEGRATION:
      return { ...state, loading: true, error: "" };
    case GET_INTEGRATION_SUCCESS:
      return {
        ...state,
        loading: false,
        integrationStatus: action.payload,
        error: "",
      };
    case GET_INTEGRATION_ERROR:
      return {
        ...state,
        loading: false,
        integrationStatus: "",
        error: action.payload,
      };
    case DELETE_INTEGRATION:
      return { ...state, loading: true, error: "" };
    case DELETE_INTEGRATION_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: "",
      };
    case DELETE_INTEGRATION_ERROR:
      return {
        ...state,
        loading: false,
        message: "",
        error: action.payload,
      };

    case LEADS_LIST_SELECTED_ITEMS_CHANGE:
      return { ...state, loading: true, selectedItems: action.payload };

    case ENDING_CALL:
      return {
        ...state,
        callEnded: true,
        loading: false,
        callSid: action.payload.callSid,
        leadId: action.payload.leadId,
        //  { CallSid, leadId, notes, save_recording, lead_status }
        error: "",
      };
    default:
      return { ...state };
  }
};
