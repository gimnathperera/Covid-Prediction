import { GET_COUNTRIES } from "../actions/ActionTypes";

function countries(state = [], action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return action.payload;

    default:
      return state;
  }
}

export default countries;
