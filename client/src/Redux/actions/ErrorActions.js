import { GET_ERRORS, CLEAR_ERRORS } from "./ActionTypes";

// Action creator to dispatch a get error action
export const getErrors = (error) => {
  return {
    type: GET_ERRORS,
    payload: error,
  };
};

// Action creator to dispatch a clear errors action
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
