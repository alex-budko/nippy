import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { login } from "../auth_functions/login";

import { useContext, useState } from "react";
import { UserContext } from "../user-context/UserContext";
import { useNavigate } from "react-router";

export default function LogIn() {
  const { user, setUser } = useContext(UserContext);
  const [isInvalid, setIsInvalid] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    setIsInvalid(false);

    //email
    const email = e.target[0].value;

    //password
    const password = e.target[1].value;

    login(email, password).then((_user) => {
      if (!_user["error"]) {
        setUser(_user);
        navigate("/");
      } else {
        //reset form
        e.target[0].value = "";
        e.target[1].value = "";

        setIsInvalid(true);
      }
    });
  };
  return (
    <Flex mt={-10} minH={"85vh"} max align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={(e) => onSubmit(e)}>
            <Stack spacing={4}>
              <FormControl isInvalid={isInvalid} id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl isInvalid={isInvalid} id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
