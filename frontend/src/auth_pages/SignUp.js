import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { Link as ReactLink, useNavigate } from "react-router-dom";
import { signup } from "../auth_functions/signup";
import { UserContext } from "../user-context/UserContext";

export default function SignUp() {
  const { user, setUser } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    setIsInvalid(false);

    //user
    const username = e.target[0].value;
    
    //email
    const email = e.target[1].value;

    //password
    const password = e.target[2].value;

    signup(username, email, password).then((_user) => {
      if (!_user["error"]) {
        setUser(_user);
        navigate("/");
      } else {
        //reset form
        e.target[0].value = "";
        e.target[1].value = "";
        e.target[2].value = "";

        setIsInvalid(true);
      }
    });
  };

  return (
    <Flex mt={-10} minH={"60vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          minW={500}
        >
          <Stack spacing={4}>
            <form onSubmit={(e)=>onSubmit(e)}>
              <HStack>
                <FormControl id="username" isInvalid={isInvalid}>
                  <FormLabel>Username</FormLabel>
                  <Input type="text" />
                </FormControl>
              </HStack>
              <FormControl id="email" isRequired isInvalid={isInvalid}>
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password" isRequired isInvalid={isInvalid}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? "text" : "password"} />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Stack spacing={10} pt={2}>
                <Button
                type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
            </form>

            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link as={ReactLink} to="/login" color={"blue.400"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
