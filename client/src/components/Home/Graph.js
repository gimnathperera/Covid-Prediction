import React from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';

function Graph({ cases, deaths, recovered, countryName }) {
  // Chart configuration

  const data = {
    labels: cases.map((data) => data.month),
    datasets: [
      {
        label: 'Cases',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: '#F1C40F',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#F1C40F',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
        data: cases.map((data) => data.caseTypeData),
      },
      {
        label: 'Deaths',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: '#ff1f2d',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#ff1f2d',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
        data: deaths.map((data) => data.caseTypeData),
      },
      {
        label: 'Recovered',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: '#a5b879',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#a5b879',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
        data: recovered.map((data) => data.caseTypeData),
      },
    ],
  };

  return (
    <div className='graph_container'>
      <Line
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: `${countryName}'s  data`,
            fontSize: 25,
          },
        }}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cases: state.historicalData.caseData,
    deaths: state.historicalData.deathsData,
    recovered: state.historicalData.recoveredData,
    countryName: state.countryData.name,
  };
};

export default connect(mapStateToProps)(Graph);
