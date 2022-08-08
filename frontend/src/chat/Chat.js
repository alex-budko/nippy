import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

import "../styles.css";

function Chat() {
  const [messages, setMessages] = useState([
    {
      user: "Alex",
      text: "Hey!",
      created: "25 min ago",
    },
    {
      user: "Misha",
      text: "Hey!",
      created: "25 min ago",
    },
    {
      user: "Alex",
      text: "Hey!",
      created: "25 min ago",
    },
    {
      user: "Misha",
      text: "Hey!",
      created: "25 min ago",
    },
    {
      user: "Alex",
      text: "Hey!",
      created: "25 min ago",
    },
    {
      user: "Misha",
      text: "Hey!",
      created: "25 min ago",
    },
  ]);
  return (
    <Center>
      <VStack
        className="chat"
        bgColor="gray.600"
        overflowY={"scroll"}
        p="5"
        zIndex={100}
        rounded="2xl"
        shadow={"dark-lg"}
        height={"80vh"}
        maxW="600px"
        minW={"300px"}
      >
        {messages.length > 0 &&
          messages.map((message, i) => {
            return (
              <Box
                key={i}
                bgColor="gray.800"
                p="5"
                w="100%"
                rounded="2xl"
                shadow={"dark-lg"}
                style={{marginBottom: `${i===messages.length - 1 ? 45 : 5}px`}}
              >
                <VStack>
                  <Text fontFamily={"bold"} fontSize="xl">
                    {message.user}
                  </Text>
                  <Divider />
                  <Text fontSize={"md"}>{message.text}</Text>
                  <Text fontSize={"xs"}>{message.created}</Text>
                </VStack>
              </Box>
            );
          })}
        <HStack position="absolute" bottom={2}>
          <Input bgColor={'gray.300'} color='gray.800' />
          <Button bgColor='green.600'>Send</Button>
        </HStack>
      </VStack>
    </Center>
  );
}

export default Chat;
