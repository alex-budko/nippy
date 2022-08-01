import { Box, Center, VStack, Heading, Spinner } from "@chakra-ui/react";
import React from "react";

function Loader() {
  return (
    <Center>
      <VStack mt={'50%'} spacing={4}>
        <Heading as="h3" size="xl" display={"block"}>
          Loading Stock Data...
        </Heading>
        <Center>
          <Spinner
            display={"block"}
            thickness="4px"
            speed="0.65s"
            color="blue.300"
            size="xl"
          />
        </Center>
      </VStack>
    </Center>
  );
}

export default Loader;
