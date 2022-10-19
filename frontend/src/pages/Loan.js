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

    // Button,
    // Center,
    // Divider,
    // Heading,
    // NumberDecrementStepper,
    // NumberIncrementStepper,
    // NumberInput,
    // NumberInputField,
    // NumberInputStepper,
  
  //trading view widget
  import { SingleTicker } from "react-tradingview-embed";
  
  import { buy_stock } from "../action_functions/buy_stock";
  import NotAuthenticated from "../auth_pages/NotAuthenticated";
  import { UserContext } from "../user-context/UserContext";
  import { moneyConvert } from "../utils/moneyConvert";
  import { get_stocks } from "../action_functions/get_stocks";
  import { sell_stock } from "../action_functions/sell_stock";
  
  function Loan() {
    let STOCK_DATA = [];
  
    const [_stocks, setStocks] = useState([]);
  
    const [Ticker, setTicker] = useState([]);
  
    const [sliderValue, setSliderValue] = useState([]);
  
    const { user, setUser } = useContext(UserContext);
  
    const { username, money, stocks } = user;
  
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
  
    const sellStock = (e, quantity) => {
      setSliderValue(
        Array.from(
          {
            length: _stocks.length,
          },
          () => 1
        )
      );
  
      //username, stock_name, stock_price
      sell_stock(username, e.target.name, quantity, setUser);
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
                      <Box minW={"250"} minH="150">
                        {Ticker[i]}
                      </Box>
  
                      <VStack>
                        {stock.name in stocks && stocks[stock.name] > 0 && (
                          <Box fontSize={"lg"} bgColor='gray.700' p='2' shadow='dark-lg' rounded={'3xl'}>Count: {stocks[stock.name]}</Box>
                       )}
                        <Button
                          name={stock.name}
                          id={stock.price}
                          onClick={(e) => buyStock(e, sliderValue[i])}
                          bgColor="blue.300"
                          _hover={{
                            bgColor: "blue.500",
                          }}
                          mt="2"
                          width={"80%"}
                        >
                          Loan
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
                            Math.floor(money / stock.price) > 0
                              ? Math.floor(money / stock.price)
                              : 1
                          }
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </VStack>
                      <VStack>
                        <Button
                          name={stock.name}
                          onClick={(e) => sellStock(e, sliderValue[i])}
                          bgColor="pink.300"
                          _hover={{
                            bgColor: "pink.500",
                          }}
                          mt="2"
                          width={"80%"}
                        >
                          Sell
                        </Button>
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
  
  export default Loan;
  