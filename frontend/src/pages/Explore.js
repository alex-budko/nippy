import React, { useEffect, useState } from "react";
import { Button, Center } from "@chakra-ui/react";
import Plot from "react-plotly.js";

function Explore() {
  const [companies, setCompanies] = useState(["IBM", "APPL"]);
  const [stockChartData, setStockChartData] = useState([
    {
      x: [],

      close: [],

      decreasing: { line: { color: "red" } },

      high: [],

      increasing: { line: { color: "green" } },

      line: { color: "rgba(31,119,180,1)" },

      low: [],
      open: [],

      type: "ohlc",
      xaxis: "x",
      yaxis: "y",
    },
  ]);
  const [stockChartLayout, setStockChartLayout] = useState({
    title: "IBM",
    dragmode: "zoom",
    margin: {
      r: 10,
      t: 25,
      b: 40,
      l: 60,
    },
    showlegend: false,
    xaxis: {
      autorange: true,
      title: "Date",
      type: "date",
    },
    yaxis: {
      autorange: true,
      type: "linear",
    },
    displaylogo: false,
  });

  const config = {
    displaylogo: false,
  };

  const fillStockChart = async (index) => {
    await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=5min&symbol=${companies[index]}&apikey=${process.env.REACT_APP_MARKET_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        for (let key in data["Time Series (5min)"]) {
          let allData = data["Time Series (5min)"][key];
          let newStockChartData = [...stockChartData];
          newStockChartData[index]["x"].push(key);
          newStockChartData[index]["open"].push(allData["1. open"]);
          newStockChartData[index]["high"].push(allData["2. high"]);
          newStockChartData[index]["low"].push(allData["3. low"]);
          newStockChartData[index]["close"].push(allData["4. close"]);
          setStockChartData(newStockChartData);
        }
      });
  };

  return (
    <Center>
      <Button onClick={() => fillStockChart(0)}>IBM</Button>
      <Plot data={stockChartData} layout={stockChartLayout} config={config} />
    </Center>
  );
}

export default Explore;
