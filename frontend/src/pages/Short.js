import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { buy_stock } from "../action_functions/buy_stock";
import NotAuthenticated from "../auth_pages/NotAuthenticated";
import { UserContext } from "../user-context/UserContext";
import { moneyConvert } from "../utils/moneyConvert";
import { SingleTicker } from "react-tradingview-embed";
import { get_stocks } from "../action_functions/get_stocks";
import { short_stock } from "../action_functions/short_stock";

function Short() {
  let STOCK_DATA = [];

  const [_stocks, setStocks] = useState([]);

  const [Ticker, setTicker] = useState([]);

  const [sliderValue, setSliderValue] = useState([]);

  const { user, setUser } = useContext(UserContext);

  const { username, shorted_money } = user;

  const shortStock = (e, quantity) => {
    setSliderValue(
      Array.from(
        {
          length: STOCK_DATA.length,
        },
        () => 1
      )
    );

    //username, stock_name, stock_price
    short_stock(username, e.target.name, e.target.id, quantity, setUser).then(
      (res) => {
        if (res === "not_enough_money") {
          console.log("Not Enough Money");
        }
      }
    );
  };

  const getStocks = async () => {
    setStocks([]);
    get_stocks()
      .then((data) => {
        STOCK_DATA = data;
        for (let item = 0; item < data.length; item++) {
          let stock = data[item];
          setStocks((stocks) => [
            ...stocks,
            { name: stock.name, price: stock.price },
          ]);
        }
      })

      .then(() => {
        setSliderValue(
          Array.from(
            {
              length: STOCK_DATA.length,
            },
            () => 1
          )
        );
        let tickers = [];
        for (let i = 0; i < STOCK_DATA.length; i++) {
          tickers.push(
            <SingleTicker
              widgetProps={{
                theme: "light",
                symbol: STOCK_DATA[i].name,
                width: 250,
                autosize: false,
                locale: "en",
                colorTheme: "dark",
              }}
            />
          );
        }
        setTicker(tickers);
      });
  };

  useEffect(() => {
    getStocks();
  }, []);

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
          <Heading>Shorted Money:</Heading>
          <Divider />
          <Center>
            <Heading>${moneyConvert(shorted_money.toFixed(2))}</Heading>
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
                    p="7"
                    _hover={{ cursor: "pointer" }}
                  >
                    <Box minW={"250"} minH="150">
                      {Ticker[i]}
                    </Box>

                    <VStack>
                      <Button
                        name={stock.name}
                        id={stock.price}
                        onClick={(e) => shortStock(e, sliderValue[i])}
                        bgColor="purple.300"
                        _hover={{
                          bgColor: 'purple.500'
                        }}
                        mt="2"
                        width={"80%"}
                      >
                        Short
                      </Button>
                      <NumberInput
                        value={sliderValue[i]}
                        onChange={(num) => {
                          let newSlider = [...sliderValue];
                          newSlider[i] = num.valueOf();
                          setSliderValue(newSlider);
                        }}
                        defaultValue={1}
                        min={1}
                        max={
                          100
                        }
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </VStack>
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

export default Short;
