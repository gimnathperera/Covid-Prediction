import React from 'react';
import DaysDropdown from './DaysDropdown';
import Loader from './Loader';
import { connect } from 'react-redux';
import {
  getPredictionData,
  setSelectedDayCount,
} from '../../Redux/actions/ActionCreators';

function PredictionHeader({
  isLoading,
  getPredictionData,
  selectedDayCount,
  setSelectedDayCount,
}) {
  // search prediction data for selected date count
  const getPredictionDataByDayCount = (country) => {
    // Get country data
    getPredictionData(country);
  };

  return (
    <header>
      <h2>Covid-19 Virus Prediction - Malaysia</h2>
      <div className='actions'>
        {isLoading && <Loader />}
        <DaysDropdown
          selectedDayCount={selectedDayCount}
          setSelectedDayCount={setSelectedDayCount}
        />
        <button
          className='primary-btn'
          onClick={() => getPredictionDataByDayCount(selectedDayCount)}
        >
          Go!
        </button>
      </div>
    </header>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
    selectedDayCount: state.selectedDayCount,
  };
};

export default connect(mapStateToProps, {
  getPredictionData,
  setSelectedDayCount,
})(PredictionHeader);
