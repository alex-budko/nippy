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
} from "@chakra-ui/react";
import { useParams } from "react-router";
import { get_profile } from "../action_functions/get_profile";

function Profile() {
  // const { user } = useContext(UserContext);
  // const { username, email, password } = user

  const [profileUser, setProfileUser] = useState({
    username: "undefined",
    email: "undefined",
    money: 0,
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
              _hover={{cursor: 'pointer'}}
                bgColor="blue.400"
                name={profileUser.username}
                size={"2xl"}
              />
            </Center>
            <HStack>
              <Heading color={"blue.600"}>Net Worth:</Heading>
              <Heading color={"gray.50"}>${profileUser.money}</Heading>
            </HStack>

            <HStack>
              <Heading color={"blue.600"}>Rank:</Heading>
              <Heading color={"gray.50"}>34/548</Heading>
            </HStack>

          </VStack>
        </Center>
      </Box>
    </Center>
  );
}

export default Profile;
