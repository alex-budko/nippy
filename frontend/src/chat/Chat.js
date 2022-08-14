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
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { create_message } from "../action_functions/create_message";
import { get_messages } from "../action_functions/get_messages.";

import "../styles.css";
import { UserContext } from "../user-context/UserContext";

function Chat() {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(UserContext);
  const { username } = user;
  const chat = useRef(null);
  const [sentMessage, setSentMessage] = useState(true);

  useEffect(() => {
    if (sentMessage) {
      get_messages().then((messages) => setMessages(messages));
      setSentMessage(false)
    }    
  }, [sentMessage, chat, chat.current]);

  return (
    <Center>
      <VStack
        ref={chat}
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
                style={{
                  marginBottom: `${i === messages.length - 1 ? 45 : 5}px`,
                }}
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
        <HStack position="absolute" p="1" bottom={2}>
          {username !== "" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                create_message(username, e.target[0].value).then(()=> {
                  setSentMessage(true);
                })
                e.target[0].value = ''
              }}
            >
              <Input
                mr="1"
                bgColor={"gray.300"}
                maxW="200px"
                color="gray.800"
              />
              <Button type="submit" bgColor="green.600">
                Send
              </Button>
            </form>
          )}
        </HStack>
      </VStack>
    </Center>
  );
}

export default Chat;
