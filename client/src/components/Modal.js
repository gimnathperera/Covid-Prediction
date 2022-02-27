import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { clearErrors } from "../Redux/actions/ErrorActions";
import {
  getCountries,
  getCountryData,
  getHistoricalData,
} from "../Redux/actions/ActionCreators";

function Modal({
  error,
  clearErrors,
  getCountries,
  getCountryData,
  getHistoricalData,
}) {
  // To close modal
  const closeModal = (e) => {
    e.preventDefault();

    // Close modal
    clearErrors();
  };

  // Retry fetching data
  const retryFetching = () => {
    // close the Modal
    clearErrors();

    // Get all countries
    getCountries();

    // Get historical data
    getHistoricalData();

    // Get country data
    getCountryData();
  };

  return ReactDOM.createPortal(
    error.isError ? (
      <div className="modal-bg">
        <div className="modal-content">
          <a href="" className="close-modal" onClick={closeModal}>
            &times;
          </a>
          <h1>Oops....</h1>
          <p>{error.err}</p>
          <button className="primary-btn" onClick={retryFetching}>
            Retry
          </button>
        </div>
      </div>
    ) : null,
    document.querySelector("#modal")
  );
}

const mapStateToProps = (state) => {
  return {
    error: state.error,
  };
};

export default connect(mapStateToProps, {
  clearErrors,
  getCountries,
  getCountryData,
  getHistoricalData,
})(Modal);
