import {
    Flex,
    Stack,
    Heading,
    Text,
    Icon,
    useColorModeValue,
    VStack,
    Button,
    HStack,
  } from "@chakra-ui/react";
  import { FaRegSadCry } from "react-icons/fa";
  import { Link } from "react-router-dom";
  
  export default function NotAuthenticated() {
    return (
      <Flex
        minH={"90vh"}
        align={"center"}
        justify={"center"}
        py={12}
      >
        <Stack
          boxShadow={"3xl"}
          shadow='dark-lg'
          bg="gray.800"
          rounded={"xl"}
          p={10}
          spacing={8}
          align={"center"}
        >
          <Icon as={FaRegSadCry} w={24} h={24} />
          <Stack align={"center"} spacing={2}>
            <Heading
              textTransform={"uppercase"}
              fontSize={"3xl"}
              color={useColorModeValue("gray.800", "gray.200")}
            ></Heading>
            <VStack>
              <Text mb="4" fontSize={"lg"} color={"gray.500"}>
                Unfortunately, this feature is only available for authenticated
                users
              </Text>
              <HStack>
                <Button
                  fontSize={"lg"}
                  _hover={{bgColor: 'green.400', color:'white'}}
                  as={Link}
                  to="/login"
                  bgColor={"green.600"}
                >
                  Log In
                </Button>
                <Button
                  fontSize={"lg"}
                  _hover={{bgColor: 'red.400', color:'white'}}
                  as={Link}
                  to="/signup"
                  bgColor={"red.600"}
                >
                  Sign Up
                </Button>
              </HStack>
            </VStack>
          </Stack>
        </Stack>
      </Flex>
    );
  }
  