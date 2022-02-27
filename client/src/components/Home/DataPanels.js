import React from "react";
import { connect } from "react-redux";
import CountUp from "react-countup";

const DataPanel = ({ title, data }) => {
  return (
    <div className="datapanel">
      <div className="icon">
        <i className="fa fa-line-chart" aria-hidden="true"></i>
      </div>
      <div className="data">
        <h3>{title}</h3>
        <h2>
          <CountUp end={data} />
        </h2>
      </div>
    </div>
  );
};

function DataPanels({ cases, deaths, recovered }) {
  return (
    <div className="datapanels_wrapper">
      <DataPanel title="Cases" data={cases} />
      <DataPanel title="Recovered" data={deaths} />
      <DataPanel title="Deaths" data={recovered} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cases: state.countryData.cases,
    deaths: state.countryData.deaths,
    recovered: state.countryData.recovered,
  };
};

export default connect(mapStateToProps)(DataPanels);
