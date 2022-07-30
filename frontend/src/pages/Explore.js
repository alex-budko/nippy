import React, { useEffect, useState } from "react";
import {
  Center,
  Heading,
  VStack,
  Spinner,
  AbsoluteCenter,
  Box,
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

  const stockChartLayout = {
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
  };

  const config = {
    displaylogo: false,
  };

  const companies = ["IBM", "AMZN", "TSLA", "ABBV", "ABEO", "GOOG"];

  const [stockChartData, setStockChartData] = useState(
    Array.from(
      {
        length: companies.length,
      },
      () => structuredClone(CHART_DATA)
    )
  );

  const [loadingCharts, setLoadingCharts] = useState(true);

  const fillStockChart = async (name, index) => {
    let newStockChartData = [...stockChartData];
    await fetch(`http://localhost:8000/api/stock/${name}/`)
      .then((res) => res.json())
      .then((data) => {
        data = data.data;
        for (let key in data["Time Series (5min)"]) {
          let allData = { ...data["Time Series (5min)"][key] };
          newStockChartData[index]["x"].push(key);
          newStockChartData[index]["open"].push(allData["1. open"]);
          newStockChartData[index]["high"].push(allData["2. high"]);
          newStockChartData[index]["low"].push(allData["3. low"]);
          newStockChartData[index]["close"].push(allData["4. close"]);
        }
        setStockChartData([...newStockChartData]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (loadingCharts) {
      for (let companyInd = 0; companyInd < companies.length; companyInd++) {
        fillStockChart(companies[companyInd], companyInd);
        if (companyInd === companies.length - 1) {
          setLoadingCharts(false);
        }
      }
    }
  }, []);

  return (
    <Center>
      <VStack>
        {!loadingCharts ? (
          companies.map((company, i) => {
            return (
              <Box
                rounded={"lg"}
                shadow={"dark-lg"}
                bgColor="gray.900"
                p="5"
                m="5"
                key={i * 41 + 34}
              >
                <Center>
                  <Heading key={40 * i + 4}>{company}</Heading>
                </Center>
                <Plot
                  key={30 * i + 2}
                  data={[stockChartData[i]]}
                  layout={stockChartLayout}
                  config={config}
                />
              </Box>
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
