import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Button,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import { logout } from "../auth_functions/logout";
import { UserContext } from "../user-context/UserContext";

export default function Settings() {

  const navigate = useNavigate()
  const { setUser } = useContext(UserContext);

  const SETTING_OPTIONS = [
    {
      name: "Terms of Service",
      link: "/tos",
    },
    {
      name: "Privacy Policy",
      link: "/privacy",
    },
    {
      name: "Color Settings",
      link: "/cs",
    },
  ];

  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"350px"}
        minH={"450px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"2xl"}
        pos={"relative"}
        zIndex={1}
      >
        <VStack spacing={"5"}>
          <Heading>Settings</Heading>
          {SETTING_OPTIONS.map((option, i) => {
            return (
              <Box
              key={i}
                rounded={"2xl"}
                minW={"80%"}
                as={Link}
                shadow="dark-lg"
                p="5"
                to={option.link}
                bgColor={"gray.800"}
              >
                <Center>{option.name}</Center>
              </Box>
            );
          })}
          <Button
          onClick={()=> {
            navigate('/')
            logout(setUser)
          }}
            width={"60%"}
            position="absolute"
            bottom={"5"}
            size="lg"
            _hover={{ bgColor: "red.800" }}
            bgColor="red.600"
          >
            Logout
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
