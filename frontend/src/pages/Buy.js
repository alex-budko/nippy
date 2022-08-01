import {
  Box,
  Button,
  Center,
  Heading,
  Text,
  useColorModeValue,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

function Buy() {
  const [stocks, setStocks] = useState([]);

  const getStocks = async () => {
    setStocks([]);
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/market/stocks/`)
      .then((res) => res.json())
      .then((data) => {
        for (let item = 0; item < data.length; item++) {
          let stock = data[item];
          setStocks((stocks) => [
            ...stocks,
            { name: stock.name, price: stock.price },
          ]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getStocks();
  }, []);

  const colorMode = useColorModeValue('gray.50', 'gray.200')

  return (
    <Wrap spacing="10" p="10" align="center" justify={"center"}>
      {stocks !== [] &&
        stocks.map((stock, i) => {
          return (
            <WrapItem key={i}>
              <Box
                bgColor={"gray.900"}
                shadow="dark-lg"
                rounded={"2xl"}
                p="5"
                _hover={{ cursor: "pointer" }}
              >
                <Heading color={colorMode}>{stock.name}</Heading>
                <Center>
                  <Text color={colorMode}>${stock.price}</Text>
                </Center>
              </Box>
            </WrapItem>
          );
        })}
    </Wrap>
  );
}

export default Buy;
