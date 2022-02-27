import React, { useState } from "react";
import Dropdown from "./Dropdown";
import Loader from "./Loader";
import { connect } from "react-redux";
import {
  getCountryData,
  getHistoricalData,
  setSelectedCountry,
} from "../../Redux/actions/ActionCreators";

function Header({
  isLoading,
  getCountryData,
  countries,
  getHistoricalData,
  selectedCountry,
  setSelectedCountry,
}) {
  // search selected country Data
  const searchCountryData = (country) => {
    // Get country data
    getCountryData(country);

    // Get country's historical data
    getHistoricalData(country);
  };

  return (
    <header>
      <h2>Covid-19 Tracker</h2>
      <div className="actions">
        {isLoading && <Loader />}
        <Dropdown
          countries={countries}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
        <button
          className="primary-btn"
          onClick={() => searchCountryData(selectedCountry)}
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
    countries: state.countries,
    selectedCountry: state.selectedCountry,
  };
};

export default connect(mapStateToProps, {
  getCountryData,
  getHistoricalData,
  setSelectedCountry,
})(Header);
