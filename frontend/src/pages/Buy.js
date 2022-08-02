import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Text,
  useColorModeValue,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { buy_stock } from "../action_functions/buy_stock";
import NotAuthenticated from "../auth_pages/NotAuthenticated";
import { UserContext } from "../user-context/UserContext";
import { moneyConvert } from "../utils/moneyConvert";



function Buy() {
  const [_stocks, setStocks] = useState([]);

  const { user, setUser } = useContext(UserContext);
  const { username, money } = user;

  const buyStock = (e) => {
    let quantity = 1;
    //username, stock_name, stock_price
    buy_stock(username, e.target.name, e.target.id, quantity, setUser).then(
      (res) => {
        if (res === "not_enough_money") {
          console.log("Not Enough Money");
        }
      }
    );
  };

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

  const colorMode = useColorModeValue("gray.50", "gray.200");

  return username !== "" ? (
    <Fragment>
      <Center>
        <VStack
          p="5"
          spacing={"3"}
          bgColor={"gray.900"}
          shadow="dark-lg"
          rounded={"2xl"}
        >
          <Heading>Available Money:</Heading>
          <Divider />
          <Center>
            <Heading>${moneyConvert(money)}</Heading>
          </Center>
        </VStack>
      </Center>
      <Wrap spacing="10" p="10" align="center" justify={"center"}>
        {_stocks !== [] &&
          _stocks.map((stock, i) => {
            return (
              <form>
                <WrapItem key={i}>
                  <Box
                    bgColor={"gray.900"}
                    shadow="dark-lg"
                    rounded={"2xl"}
                    minW="200px"
                    p="7"
                    _hover={{ cursor: "pointer" }}
                  >
                    <Center>
                      <Heading color={colorMode}>{stock.name}</Heading>
                    </Center>
                    <Center>
                      <Text color={colorMode}>${stock.price}</Text>
                    </Center>
                    <Center>
                      <Button
                        name={stock.name}
                        id={stock.price}
                        onClick={(e) => buyStock(e)}
                        bgColor="blue.300"
                        mt="2"
                        width={"80%"}
                      >
                        Buy
                      </Button>
                    </Center>
                  </Box>
                </WrapItem>
              </form>
            );
          })}
      </Wrap>
    </Fragment>
  ) : (
    <NotAuthenticated />
  );
}

export default Buy;
