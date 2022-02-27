import { SET_IS_LOADING } from "../actions/ActionTypes";

function isLoading(state = false, action) {
  switch (action.type) {
    case SET_IS_LOADING:
      return action.payload;

    default:
      return state;
  }
}

export default isLoading;
