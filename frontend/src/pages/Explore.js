import React, { useEffect, useState } from "react";
import {
  Center,
  Heading,
  VStack,
  Wrap,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import Loader from "../utils/Loader";

import { Link } from "react-router-dom";
import { MiniChart } from "react-tradingview-embed";


function Explore() {
  const companies = [
    "IBM",
    "AMZN",
    "TSLA",
    "ABBV",
    "ABEO",
    "GOOG",
    "ADBE",
    "ATVI",
    "EBAY",
    "EA",
    "INTC",
  ];

  const [loadingCharts, setLoadingCharts] = useState(false);

  const colorMode = useColorModeValue("gray.50", "gray.200");


  return (
    <Center>
      <Wrap align={"center"} justify="center">
        {!loadingCharts ? (
          companies.map((company, i) => {
            return (
              <VStack
                onClick={(e) => console.log(e)}
                rounded={"lg"}
                shadow={"dark-lg"}
                bgColor="gray.900"
                p="5"
                m="5"
                key={i * 41 + 34}
              >
                <Center>
                  <Heading
                    as={Link}
                    to={`/stock/${company}`}
                    color={colorMode}
                    key={40 * i + 4}
                  >
                    {company}
                  </Heading>
                </Center>
                <Box>
                  <MiniChart
                    widgetProps={{
                      autosize: true,
                      interval: "1m",
                      isTransparent: false,
                      symbol: company,
                      showIntervalTabs: true,
                      locale: "en",
                      colorTheme: "dark",
                    }}
                  />
                </Box>
              </VStack>
            );
          })
        ) : (
          <Loader />
        )}
      </Wrap>
    </Center>
  );
}

export default Explore;
