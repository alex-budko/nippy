import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Link,
    Stack,
    Textarea,
    Spinner,
    Tooltip,
    useClipboard,
    useColorModeValue,
    VStack,
  } from '@chakra-ui/react';
  import React, { useState } from 'react';
  import { BsGithub, BsPerson, } from 'react-icons/bs';
  import { MdEmail, MdOutlineEmail } from 'react-icons/md';
import { send_message } from '../../action_functions/send_message';
    
  export default function Contact() {
    const { hasCopied, onCopy } = useClipboard('alex.budko2017@gmail.com');

    const [sentMessage, setSentMessage] = useState(false)

    const [loading, setLoading] = useState(false)
  
    return (
      <Flex
        bg={useColorModeValue('gray.100', 'gray.900')}
        align="center"
        justify="center"
        id="contact">
        <Box
          borderRadius="lg"
          m={{ base: 5, md: 10, lg: 5 }}
          p={{ base: 5, lg: 16 }}>
          <Box>
            <VStack spacing={{ base: 4, md: 8, lg: 20 }}>
              <Heading
                fontSize={{
                  base: '4xl',
                  md: '5xl',
                }}>
                Get in Touch
              </Heading>
  
              <Stack>
                <HStack
                  align="center"
                  justify="space-around">
                  <Tooltip
                    label={hasCopied ? 'Email Copied!' : 'Copy Email'}
                    closeOnClick={false}
                    hasArrow>
                    <IconButton
                      aria-label="email"
                      variant="ghost"
                      size="lg"
                      fontSize="3xl"
                      icon={<MdEmail />}
                      _hover={{
                        bg: 'blue.500',
                        color: useColorModeValue('white', 'gray.700'),
                      }}
                      onClick={onCopy}
                      isRound
                    />
                  </Tooltip>
  
                  <Link href="https://github.com/alex-budko/nippy">
                    <IconButton
                      aria-label="github"
                      variant="ghost"
                      size="lg"
                      fontSize="3xl"
                      icon={<BsGithub />}
                      _hover={{
                        bg: 'blue.500',
                        color: useColorModeValue('white', 'gray.700'),
                      }}
                      isRound
                    />
                  </Link>
  
                </HStack>
  
                <Box
                  bg={useColorModeValue('white', 'gray.700')}
                  borderRadius="lg"
                  p={8}
                  as='form'
                  onSubmit={(e)=> {
                    e.preventDefault()
                    setLoading(true)
                    send_message(e.target[0].value, e.target[1].value, e.target[2].value).then((res)=> {
                        if (res['success']) {
                            setSentMessage(true)
                        }
                        setLoading(false)
                    })
                  }}
                  color={useColorModeValue('gray.700', 'whiteAlpha.900')}
                  shadow="base">
                  <VStack spacing={5}>
                    <FormControl isRequired>
                      <FormLabel>Name</FormLabel>
  
                      <InputGroup>
                        <InputLeftElement children={<BsPerson />} />
                        <Input type="text" name="name" placeholder="Your Name" />
                      </InputGroup>
                    </FormControl>
  
                    <FormControl isRequired>
                      <FormLabel>Email</FormLabel>
  
                      <InputGroup>
                        <InputLeftElement children={<MdOutlineEmail />} />
                        <Input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                        />
                      </InputGroup>
                    </FormControl>
  
                    <FormControl isRequired>
                      <FormLabel>Message</FormLabel>
  
                      <Textarea
                        name="message"
                        placeholder="Your Message"
                        rows={6}
                        resize="none"
                      />
                    </FormControl>
  
                    <Button
                    minW='75%'
                      colorScheme="blue"
                      bg={!sentMessage ? "blue.400" : "green.500"}
                      color="white"
                      _hover={{
                        bg: !sentMessage ? 'blue.500' : 'green.600',
                      }}
                      isFullWidth
                      type={!sentMessage ? 'submit' : 'button'}>
                      {loading ? <Spinner /> : !sentMessage ? 'Send Message' : "Sent Succcessfully!"}
                    </Button>
                  </VStack>
                </Box>
              </Stack>
            </VStack>
          </Box>
        </Box>
      </Flex>
    );
  }