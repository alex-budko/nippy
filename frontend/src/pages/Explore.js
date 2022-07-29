import React, { useEffect, useState } from "react";
import {
  Center,
  Heading,
  VStack,
  Spinner,
  AbsoluteCenter,
  Button,
} from "@chakra-ui/react";
import Plot from "react-plotly.js";

function Explore() {

  const CHART_DATA = {
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
  };

  const companies = ["IBM", "AA", "ACCD"]

  const [stockChartData, setStockChartData] = useState(
    Array(companies.length).fill({...CHART_DATA})
  );

  const [loadingCharts, setLoadingCharts] = useState(true);
  const [stockChartLayout, setStockChartLayout] = useState({
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
    const company = companies[index]
    let newStockChartData = [...stockChartData];
    await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=5min&symbol=${company}&apikey=${process.env.REACT_APP_MARKET_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        for (let key in data["Time Series (5min)"]) {

          let allData = {...data["Time Series (5min)"][key]};

          newStockChartData[index]["x"].push(key);
          newStockChartData[index]["open"].push(allData["1. open"]);
          newStockChartData[index]["high"].push(allData["2. high"]);
          newStockChartData[index]["low"].push(allData["3. low"]);
          newStockChartData[index]["close"].push(allData["4. close"]);
        }
      }).finally(()=> {
        setStockChartData([...newStockChartData]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const c = ()=> {
    for (let companyInd = 0; companyInd < companies.length; companyInd++) {
      fillStockChart(companyInd);
      if (companyInd === companies.length - 1) {
        setLoadingCharts(false);
      }
    }
  }

  return (
    <Center>
      <Button onClick={()=> c()}>CLICK ME</Button>
      <VStack>
        {!loadingCharts ? (
          companies.map((company, i) => {
            return (
              <>
                <Heading key={40 * i + 4}>{company}</Heading>
                <Plot
                  key={30 * i + 2}
                  data={[stockChartData[i]]}
                  layout={stockChartLayout}
                  config={config}
                />
              </>
            );
          })
        ) : (
          <AbsoluteCenter>
            <Spinner size="xl" />
          </AbsoluteCenter>
        )}
      </VStack>
    </Center>
  );
}

export default Explore;
