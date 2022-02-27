import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import LeftSidebar from './components/LeftSidebar';
import { connect } from 'react-redux';
import {
  getCountries,
  getCountryData,
  getHistoricalData,
} from './Redux/actions/ActionCreators';
import Map from './components/Map';
import Footer from './components/Footer';
import { getTopAffectedCountries } from './Redux/actions/ActionCreators';
import TopAffectedCountry from './components/TopAffectedCountry';
import Prediction from './components/Prediction';
import Info from './components/Info';

function App({
  getCountries,
  getCountryData,
  getHistoricalData,
  getTopAffectedCountries,
}) {
  useEffect(() => {
    getCountries();
    getCountryData();
    getHistoricalData();
    getTopAffectedCountries();
  }, []);

  return (
    <>
      <div className='App'>
        <div className='App__left'>
          <LeftSidebar />
        </div>
        <div className='App__right'>
          <Switch>
            <Route path={process.env.PUBLIC_URL + '/'} component={Home} exact />
            <Route path={process.env.PUBLIC_URL + '/map'} component={Map} />
            <Route
              path={process.env.PUBLIC_URL + '/prediction'}
              component={Prediction}
            />
            <Route
              path={process.env.PUBLIC_URL + '/countries'}
              component={TopAffectedCountry}
            />
            <Route path={process.env.PUBLIC_URL + '/info'} component={Info} />
          </Switch>
          <Footer />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps, {
  getCountries,
  getCountryData,
  getHistoricalData,
  getTopAffectedCountries,
})(App);
