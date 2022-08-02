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
} from "@chakra-ui/react";
import { useParams } from "react-router";
import { get_profile } from "../action_functions/get_profile";
import { sell_stock } from "../action_functions/sell_stock";
import { moneyConvert } from "../utils/moneyConvert";

function Profile() {
  const { user, setUser } = useContext(UserContext);

  const sellStock = (stock_name) => {
    sell_stock(user.username, stock_name, setUser).then((upd_user) => {
      setProfileUser(upd_user);
    });
  };

  const [profileUser, setProfileUser] = useState({
    username: "",
    email: "",
    money: 0,
    stocks: {},
  });

  const { username } = useParams();

  useEffect(() => {
    get_profile(username).then((res) => setProfileUser(res.data));
  }, []);

  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"600px"}
        minH={"550px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
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
              <Heading color={"blue.600"}>Net Worth:</Heading>
              <Heading color={"gray.50"}>${moneyConvert(profileUser.money)}</Heading>
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
                        bgColor={"blue.300"}
                        p="3"
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
                              <Button onClick={() => sellStock(stock_name)}>
                                Sell
                              </Button>
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
