import {
  Box,
  Center,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";

export default function Deposit() {
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
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Center>
          <Heading>Deposit</Heading>
        </Center>
      </Box>
    </Center>
  );
}