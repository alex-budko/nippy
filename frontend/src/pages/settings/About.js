import {
  Box,
  Center,
  Divider,
  Heading,
  Icon,
  Text,
  Wrap,
} from "@chakra-ui/react";
import React from "react";
import { AiFillGithub } from "react-icons/ai";
function About() {
  return (
    <Center>
      <Box
        p="5"
        maxW="500px"
        minH="500px"
        bgColor="gray.600"
        rounded="3xl"
        shadow="dark-lg"
      >
        <Wrap justify={"center"}>
          <Heading>About</Heading>
          <Divider h="2" rounded="full" bgColor="blue.300" />
          <Text textAlign={"center"}>
            Nippy is a website designed by Alexander Budko, an undegraduate
            student at University of Pennsylvania. This online stock-trading
            simulation was created in hopes that it would enable people to test
            out their ability in becoming milionaries with no included risk, as they would
            be using fake money. In doing so, it would allow them to experience
            the benefit of the stock market, without any potential losses!{" "}
          </Text>
          <a href="https://github.com/alex-budko/nippy">
            <AiFillGithub
              style={{
                width: "50px",
                height: "50px",
                cursor: "pointer",
              }}
            />
          </a>
        </Wrap>
      </Box>
    </Center>
  );
}

export default About;
