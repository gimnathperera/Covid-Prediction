import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

export default function Map() {
  const [countries, setCountries] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 20,
    longitude: 77,
    width: "88vw",
    height: "100vh",
    zoom: 1,
  });
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    // fetching data
    const fetchData = () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((res) => setCountries(res));
    };

    fetchData();

    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedCountry(null);
      }
    };

    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div className="map_container">
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/vyvawypihy/cl0292fpn003914np0vci2npb"
        mapboxApiAccessToken={'pk.eyJ1Ijoidnl2YXd5cGloeSIsImEiOiJjbDAyOHpidjAwNHNkM2ZxYmdreGJsYXh3In0.jkF4a0am7diVT-jXbzh6FA'}
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        {countries?.map((data) => (
          <Marker
            key={data.country}
            latitude={data.countryInfo.lat}
            longitude={data.countryInfo.long}
          >
            <button
              className="marker-btn"
              onClick={(e) => {
                e.preventDefault();
                setSelectedCountry(data);
              }}
            >
              <div className="circle"></div>
            </button>
          </Marker>
        ))}
        {selectedCountry && (
          <Popup
            className="popup_wrapper"
            latitude={selectedCountry.countryInfo.lat}
            longitude={selectedCountry.countryInfo.long}
            onClose={() => setSelectedCountry(null)}
          >
            <div className="popup">
              <h4>{selectedCountry.country}</h4>
              <img src={selectedCountry.countryInfo.flag} alt="" />
              <ul>
                <li>Cases - {selectedCountry.cases}</li>
                <li>Deaths - {selectedCountry.deaths}</li>
                <li>Recovered - {selectedCountry.recovered}</li>
              </ul>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}
