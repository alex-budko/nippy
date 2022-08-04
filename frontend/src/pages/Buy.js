import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
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

import { AiOutlineDollarCircle } from "react-icons/ai";

import { Link } from "react-router-dom";
import { SingleTicker } from "react-tradingview-embed";

function Buy() {
  const [_stocks, setStocks] = useState([]);

  const [sliderValue, setSliderValue] = useState([]);

  const { user, setUser } = useContext(UserContext);
  const { username, money } = user;

  const buyStock = (e, quantity) => {
    setSliderValue(
      Array.from(
        {
          length: _stocks.length,
        },
        () => 1
      )
    );

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
      .then(() => {
        setSliderValue(
          Array.from(
            {
              length: _stocks.length,
            },
            () => 1
          )
        );
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
            <Heading>${moneyConvert(money.toFixed(2))}</Heading>
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
                    <Box minW={'250'} minH='150'>
                      <SingleTicker
                        widgetProps={{
                          theme: "dark",
                          width: 250,
                          autosize: false,
                          symbol: stock.name,
                          locale: "en",
                          colorTheme: "dark",
                        }}
                      />
                    </Box>

                    <VStack>
                      <Button
                        name={stock.name}
                        id={stock.price}
                        onClick={(e) => buyStock(e, sliderValue[i], i)}
                        bgColor="blue.300"
                        mt="2"
                        width={"80%"}
                      >
                        Buy
                      </Button>
                      <Slider
                        value={sliderValue[i]}
                        aria-label="slider-ex-4"
                        min={1}
                        max={
                          Math.floor(money / stock.price) > 0
                            ? Math.floor(money / stock.price)
                            : 1
                        }
                        defaultValue={1}
                        onChange={(num) => {
                          let newSlider = [...sliderValue];
                          newSlider[i] = num;
                          setSliderValue(newSlider);
                        }}
                      >
                        <SliderTrack bg="red.100">
                          <SliderFilledTrack bg="tomato" />
                        </SliderTrack>

                        <SliderThumb boxSize={6}>
                          <Box color="tomato" as={AiOutlineDollarCircle} />
                        </SliderThumb>
                        <SliderMark
                          value={sliderValue[i]}
                          textAlign="center"
                          placement="bottom"
                          bg="red.300"
                          color="white"
                          rounded={"3xl"}
                          mt="5"
                          ml={"-3"}
                          w="15"
                        >
                          {sliderValue[i]}
                        </SliderMark>
                      </Slider>
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

export default Buy;
