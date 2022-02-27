import React from 'react';
import { connect } from 'react-redux';
import PredictionHeader from './Home/PredictionHeader';

function Prediction({ isLoading, predictionData }) {
  return (
    <>
      <PredictionHeader />
      <div className='info'>
        <div className='info_header'>
          <h2>
            Protect yourself and others around you by knowing the facts and
            taking appropriate precautions. Follow advice provided by your local
            health authority.
          </h2>
        </div>
        <div className='info_content'>
          <h4>To prevent the spread of COVID-19:</h4>
          <div className='image-container'>
            <img src={predictionData} alt='img' />
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
    predictionData: state.predictionData,
  };
};

export default connect(mapStateToProps, null)(Prediction);
