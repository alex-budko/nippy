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
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";
import { useParams } from "react-router";
import { get_profile } from "../action_functions/get_profile";
import { sell_stock } from "../action_functions/sell_stock";
import { moneyConvert } from "../utils/moneyConvert";
import { AiOutlineDollarCircle } from "react-icons/ai";

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [sliderValue, setSliderValue] = useState([]);
  const [profileUser, setProfileUser] = useState({
    username: "",
    email: "",
    money: 0,
    stocks: {},
  });

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
      .then((res) => setProfileUser(res.data))
      .then(() => {
        setSliderValue(
          Array.from(
            {
              length: Object.keys(profileUser.stocks).length,
            },
            () => 1
          )
        );
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
        boxShadow={"2xl"}
        rounded={"20%"}
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
                ${moneyConvert(profileUser.money.toFixed(2))}
              </Heading>
            </HStack>

            <HStack>
              <Heading color={"blue.600"}>Rank:</Heading>
              <Heading color={"gray.50"}>34/548</Heading>
            </HStack>

            <Wrap justify={"center"} spacing={5}>
              {profileUser.stocks !== {} &&
                Object.keys(profileUser.stocks).map((stock_name, i) => {
                  if (profileUser.stocks[stock_name] > 0) {
                    return (
                      <WrapItem
                        key={i}
                        bgColor={"red.300"}
                        px="5"
                        py={"8"}
                        rounded={"2xl"}
                        shadow="dark-lg"
                      >
                        <VStack>
                          <Heading size={"md"}>{stock_name}</Heading>
                          <Text>
                            Quantity: {profileUser.stocks[stock_name]}{" "}
                          </Text>
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
                                <Slider
                                  aria-label="slider-ex-4"
                                  value={sliderValue[i]}
                                  min={1}
                                  max={profileUser.stocks[stock_name]}
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
                                    <Box
                                      color="tomato"
                                      as={AiOutlineDollarCircle}
                                    />
                                  </SliderThumb>
                                  <SliderMark
                                    value={sliderValue[i]}
                                    textAlign="center"
                                    placement="bottom"
                                    bg="blue.300"
                                    color="white"
                                    rounded={"3xl"}
                                    mt="4"
                                    ml={"-5"}
                                    w="10"
                                  >
                                    {sliderValue[i]}
                                  </SliderMark>
                                </Slider>
                              </>
                            )}
                        </VStack>
                      </WrapItem>
                    );
                  }
                })}
            </Wrap>
          </VStack>
        </Center>
      </Box>
    </Center>
  );
}

export default Profile;
