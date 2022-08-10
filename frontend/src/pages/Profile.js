import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../user-context/UserContext";

import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Avatar,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  Text,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useParams } from "react-router";
import { get_profile } from "../action_functions/get_profile";
import { sell_stock } from "../action_functions/sell_stock";
import { moneyConvert } from "../utils/moneyConvert";
import { SingleTicker } from "react-tradingview-embed";

function Profile() {


  let PROFILE_STOCKS = [];
  const { user, setUser } = useContext(UserContext);

  const [sliderValue, setSliderValue] = useState([]);

  const [profileUser, setProfileUser] = useState({
    username: "",
    email: "",
    money: 0,
    stocks: {},
  });

  const [Ticker, setTicker] = useState([]);

  const sellStock = (stock_name, quantity) => {
    setSliderValue(
      Array.from(
        {
          length: Object.keys(profileUser.stocks).length,
        },
        () => 1
      )
    );

    sell_stock(user.username, stock_name, quantity, setUser).then(
      (upd_user) => {
        setProfileUser(upd_user);
      }
    );
  };

  const { username } = useParams();

  useEffect(() => {
    get_profile(username)
      .then((res) => {
        setProfileUser(res.data);
        PROFILE_STOCKS = res.data.stocks;
      })
      .then(() => {
        setSliderValue(
          Array.from(
            {
              length: Object.keys(PROFILE_STOCKS).length,
            },
            () => 1
          )
        );

        let tickers = [];
        for (let i = 0; i < Object.keys(PROFILE_STOCKS).length; i++) {
          tickers.push(
            <SingleTicker
              widgetProps={{
                symbol: Object.keys(PROFILE_STOCKS)[i],
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
  }, []);

  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"600px"}
        minH={"600px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        shadow={"2xl"}
        rounded={"2xl"}
        pos={"relative"}
        zIndex={1}
      >
        <Center>
          <VStack spacing="5">
            <Heading>{profileUser.username}'s Profile</Heading>
            <Center>
              <Avatar
                _hover={{ cursor: "pointer" }}
                name={profileUser.username}
                size={"2xl"}
              />
            </Center>
            <HStack>
              <Heading color={"blue.600"}>Worth:</Heading>
              <Heading color={"gray.50"}>
                {profileUser.money && (
                  <>${moneyConvert(profileUser.money.toFixed(2))} </>
                )}
              </Heading>
            </HStack>
            <Wrap justify={"center"} spacing={5}>
              {profileUser.stocks !== {} &&
                Object.keys(profileUser.stocks).map((stock_name, i) => {
                  if (profileUser.stocks[stock_name] <= 0) return <></>;
                  return (
                    <WrapItem
                      key={i}
                      bgColor={"gray.900"}
                      px="5"
                      py={"8"}
                      rounded={"25%"}
                      shadow="2xl"
                    >
                      <VStack>
                        {Ticker[i]}
                        <Text>Quantity: {profileUser.stocks[stock_name]} </Text>
                        {user.username !== "" &&
                          user.username === profileUser.username && (
                            <>
                              <Button
                                bgColor="blue.300"
                                mt="2"
                                width={"80%"}
                                onClick={() =>
                                  sellStock(stock_name, sliderValue[i])
                                }
                              >
                                Sell
                              </Button>

                              <NumberInput
                                value={sliderValue[i]}
                                onChange={(num) => {
                                  let newSlider = [...sliderValue];
                                  newSlider[i] = num;
                                  setSliderValue(newSlider);
                                }}
                                defaultValue={1}
                                min={1}
                                max={profileUser.stocks[stock_name]}
                              >
                                <NumberInputField />
                                <NumberInputStepper>
                                  <NumberIncrementStepper />
                                  <NumberDecrementStepper />
                                </NumberInputStepper>
                              </NumberInput>
                            </>
                          )}
                      </VStack>
                    </WrapItem>
                  );
                })}
            </Wrap>
          </VStack>
        </Center>
      </Box>
    </Center>
  );
}

export default Profile;
