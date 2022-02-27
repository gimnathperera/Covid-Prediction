import { GET_PREDICTION_DATA } from '../actions/ActionTypes';

const initialState = 'http://192.168.1.101:5000/api/predict?days=7';

function selectedDayCount(state = initialState, action) {
  switch (action.type) {
    case GET_PREDICTION_DATA:
      return action.payload;

    default:
      return state;
  }
}

export default selectedDayCount;
