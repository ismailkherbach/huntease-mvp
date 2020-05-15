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

export const getGuide = () => ({
  type: GET_GUIDE,
});

export const getGuideSuccess = (item) => ({
  type: GET_GUIDE_SUCCESS,
  payload: item,
});

export const getGuideError = (error) => ({
  type: GET_GUIDE_ERROR,
  payload: error,
});

export const addGuide = (guide) => ({
  type: ADD_GUIDE,
  payload: guide,
});

export const addGuideSuccess = (guide) => ({
  type: ADD_GUIDE_SUCCESS,
  payload: guide,
});

export const addGuideError = (error) => ({
  type: ADD_GUIDE_ERROR,
  payload: error,
});

export const deleteGuide = (id) => ({
  type: DELETE_GUIDE,
  payload: id,
});

export const deleteGuideSuccess = (guide) => ({
  type: DELETE_GUIDE_SUCCESS,
  payload: guide,
});

export const deleteGuiderror = (error) => ({
  type: DELETE_GUIDE_ERROR,
  payload: error,
});
