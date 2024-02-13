import React, { useState } from 'react'
import BarChartBox from "../components/barChartBox/BarChartBox.js";
import BigChartBox from "../components/bigChartBox/BigChartBox.js";
import ChartBox from "../components/chartBox/ChartBox.js";
import PieChartBox from "../components/pieCartBox/PieChartBox.js";
import TopBox from "../components/topBox/TopBox.js";
import Loader from "../components/Loader/Loader.jsx"
import {
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from "../data.js";

import "../styles/global.scss";
import "../styles/variables.scss";
import "../styles/responsive.scss";


const Home = () => {

  const [loading, setLoading] = useState(true);

  // loading implementation

  setTimeout(() => {
    setLoading(false)
  }, 1200);

  const MainFunction = () => {

    return (
      <div className="home">
        <div className="box box1">
          <TopBox />
        </div>
        <div className="box box2">
          <ChartBox {...chartBoxUser} />
        </div>
        <div className="box box3">
          <ChartBox {...chartBoxProduct} />
        </div>
        <div className="box box4">
          <PieChartBox />
        </div>
        <div className="box box5">
          <ChartBox {...chartBoxConversion} />
        </div>
        <div className="box box6">
          <ChartBox {...chartBoxRevenue} />
        </div>
        <div className="box box7">
          <BigChartBox />
        </div>
        <div className="box box8">
          <BarChartBox {...barChartBoxVisit} />
        </div>
        <div className="box box9">
          <BarChartBox {...barChartBoxRevenue} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {loading ? <Loader message="Getting Dashboard"/> : <MainFunction />}
    </div>
  )
}

export default Home