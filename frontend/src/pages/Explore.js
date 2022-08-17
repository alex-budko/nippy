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
import { get_stocks } from "../action_functions/get_stocks";

function Explore() {
  const [stocks, setStocks] = useState([]);

  const [loadedStocks, setLoadedStocks] = useState(false);

  const colorMode = useColorModeValue("gray.50", "gray.200");

  const getStocks = async () => {
    get_stocks().then((data) => {
      for (let item = 0; item < data.length; item++) {
        let stock = data[item];
        setStocks((stocks) => [...stocks, stock.name]);
      }
    });
  };

  useEffect(() => {
    if (!loadedStocks) {
      getStocks().then(() => {
        setLoadedStocks(true);
      });
    }
  }, []);

  return (
    <Center>
      <Wrap align={"center"} justify="center">
        {loadedStocks && stocks.length > 0 ? (
          stocks.map((stock, i) => {
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
                    to={`/stock/${stock}`}
                    color={colorMode}
                    key={40 * i + 4}
                  >
                    {stock}
                  </Heading>
                </Center>
                <Box>
                  <MiniChart
                    widgetProps={{
                      autosize: true,
                      interval: "1m",
                      isTransparent: false,
                      symbol: stock,
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
