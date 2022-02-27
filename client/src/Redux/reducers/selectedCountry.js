import { SET_SELECTED_COUNTRY } from "../actions/ActionTypes";

const initialState = "Malaysia";

function selectedCountry(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_COUNTRY:
      return action.payload;

    default:
      return state;
  }
}

export default selectedCountry;
