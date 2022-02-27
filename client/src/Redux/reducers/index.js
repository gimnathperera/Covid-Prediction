import { combineReducers } from 'redux';
import isLoading from './isLoading';
import countries from './countries';
import countryData from './countryData';
import historicalData from './historicalData';
import error from './error';
import topAffectedCountries from './topAffectedCountries';
import selectedCountry from './selectedCountry';
import selectedDayCount from './selectedDays';
import predictionData from './predictionData';

export default combineReducers({
  isLoading,
  countries,
  countryData,
  historicalData,
  error,
  topAffectedCountries,
  selectedCountry,
  selectedDayCount,
  predictionData,
});
