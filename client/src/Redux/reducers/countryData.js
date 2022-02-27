import { GET_COUNTRY_DATA } from "../actions/ActionTypes";

const initialState = {
  name: null,
  todayCases: null,
  todayDeaths: null,
  todayRecovered: null,
  active: null,
  critical: null,
  cases: null,
  deaths: null,
  recovered: null,
};

function countryData(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRY_DATA:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

export default countryData;
