import { SET_PREDICTION_DATE_COUNT } from '../actions/ActionTypes';

const initialState = 7;

function selectedDayCount(state = initialState, action) {
  switch (action.type) {
    case SET_PREDICTION_DATE_COUNT:
      return action.payload;

    default:
      return state;
  }
}

export default selectedDayCount;
