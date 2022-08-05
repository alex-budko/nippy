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
import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { buy_stock } from "../action_functions/buy_stock";
import NotAuthenticated from "../auth_pages/NotAuthenticated";
import { UserContext } from "../user-context/UserContext";
import { moneyConvert } from "../utils/moneyConvert";
import { SingleTicker } from "react-tradingview-embed";

function Buy() {
  const [_stocks, setStocks] = useState([]);

  const [Ticker, setTicker] = useState([]);

  const Ticker_ = useCallback(
    ({symbol, index=0}) => {
      if (Ticker[index].props) {
        Ticker[index].props.widgetProps.symbol = symbol
        return Ticker[index];
      }
    },
    [Ticker, setTicker]
  );

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
        setTicker(
          Array.from(
            {
              length: _stocks.length,
            },
            () => (
              <SingleTicker
                widgetProps={{
                  theme: "light",
                  width: 250,
                  autosize: false,
                  symbol: "BTC",
                  locale: "en",
                  colorTheme: "dark",
                }}
              />
            )
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
                      <Ticker_
                        symbol={stock.name}
                        index={i}
                      />
                    </Box>

                    <VStack>
                      <Button
                        name={stock.name}
                        id={stock.price}
                        onClick={(e) => buyStock(e, sliderValue[i])}
                        bgColor="blue.300"
                        mt="2"
                        width={"80%"}
                      >
                        Buy
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
