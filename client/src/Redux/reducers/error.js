import { GET_ERRORS, CLEAR_ERRORS } from "../actions/ActionTypes";

const initialState = {
  isError: false,
  id: "",
  err: "",
};

function errors(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        isError: true,
        ...action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        id: "",
        isError: false,
        err: "",
      };

    default:
      return state;
  }
}

export default errors;
