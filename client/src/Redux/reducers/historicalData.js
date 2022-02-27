import { GET_HISTORICAL_DATA } from "../actions/ActionTypes";

const initialState = {
  caseData: [],
  deathsData: [],
  recoveredData: [],
};

function historicalData(state = initialState, action) {
  switch (action.type) {
    case GET_HISTORICAL_DATA:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

export default historicalData;
