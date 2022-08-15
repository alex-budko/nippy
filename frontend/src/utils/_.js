// const CHART_DATA = {
//     x: [],
//     close: [],
//     decreasing: { line: { color: "red" } },
//     high: [],
//     increasing: { line: { color: "green" } },
//     line: { color: "rgba(31,119,180,1)" },
//     low: [],
//     open: [],
//     type: "ohlc",
//     xaxis: "x",
//     yaxis: "y",
//   };

//   const stockChartLayout = {
//     dragmode: "zoom",
//     margin: {
//       r: 10,
//       t: 25,
//       b: 40,
//       l: 60,
//     },
//     width: 425,
//     height: 220,
//     showlegend: false,
//     xaxis: {
//       autorange: true,
//       title: "Date",
//       type: "date",
//     },
//     yaxis: {
//       autorange: true,
//       type: "linear",
//     },
//     displaylogo: false,
//   };

//   const config = {
//     displaylogo: false,
//     displayModeBar: false,
//   };

{
  /* <Plot
        key={30 * i + 2}
        data={[stockChartData[i]]}
        layout={stockChartLayout}
        config={config}
    /> */
}

// const fillStockChart = async (name, index) => {
//     let newStockChartData = [...stockChartData];
//     await fetch(`${process.env.REACT_APP_BACKEND_URL}/market/stock/${name}/`)
//       .then((res) => res.json())
//       .then((data) => {
//         data = data.data;
//         for (let key in data["Time Series (5min)"]) {
//           let allData = { ...data["Time Series (5min)"][key] };
//           newStockChartData[index]["x"].push(key);
//           newStockChartData[index]["open"].push(allData["1. open"]);
//           newStockChartData[index]["high"].push(allData["2. high"]);
//           newStockChartData[index]["low"].push(allData["3. low"]);
//           newStockChartData[index]["close"].push(allData["4. close"]);
//         }
//         setStockChartData([...newStockChartData]);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   useEffect(() => {
//     if (loadingCharts) {
//       for (let companyInd = 0; companyInd < companies.length; companyInd++) {
//         fillStockChart(companies[companyInd], companyInd).then(() => {
//           if (companyInd === companies.length - 1) {
//             setLoadingCharts(false)
//           }
//         });
//       }
//     }
//   }, []);

{
  /* <Center>
                      <Heading as={Link} to={`/stock/${stock.name}`} color={colorMode}>{stock.name}</Heading>
                    </Center>
                    <Center>
                      <Text color={colorMode}>${stock.price}</Text>
                    </Center> */
}
