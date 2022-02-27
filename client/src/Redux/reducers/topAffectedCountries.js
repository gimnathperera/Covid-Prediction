import { GET_TOP_AFFECTED_COUNTRIES } from "../actions/ActionTypes";

const initialState = [];

function topAffectedCountries(state = initialState, action) {
  switch (action.type) {
    case GET_TOP_AFFECTED_COUNTRIES:
      return action.payload;

    default:
      return state;
  }
}

export default topAffectedCountries;
