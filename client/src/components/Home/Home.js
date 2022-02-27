import React from "react";
import DataPanels from "./DataPanels";
import Header from "./Header";
import CountryData from "./CountryData";
import Graph from "./Graph";
import Modal from "../Modal";

function Home() {
  return (
    <div className="home-wrapper">
      <Modal />
      <Header />
      <DataPanels />
      <CountryData />
      <Graph />
    </div>
  );
}

export default Home;
