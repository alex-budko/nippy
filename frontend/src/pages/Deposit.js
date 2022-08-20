import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Wrap,
  WrapItem,
  VStack,
  Button,
  Text,
  HStack,
  Divider,
} from "@chakra-ui/react";

import { CheckIcon } from "@chakra-ui/icons";

export default function Deposit() {
  const PURCHASE_OPTIONS = [
    {
      heading: "Light",
      price: "4.99",
      perks: ["Unlimited Name Change", "$100,000 Virtual Dollars"],
      color: "green.600",
    },
    {
      heading: "Normal",
      price: "14.99",
      perks: [
        "Unlimited Name Change",
        "$500,000 Virtual Dollars",
        "Compete in Weekly Tournaments",
      ],
      color: "red.600",
    },
    {
      heading: "Premium",
      price: "24.99",
      perks: [
        "Unlimited Name Change",
        "$1,500,000 Virtual Dollars",
        "Compete in Weekly Tournaments",
      ],
      color: "yellow.600",
    },
  ];
  return (
    <Wrap spacing="5" justify={"center"}>
      {PURCHASE_OPTIONS.map((option, i) => {
        return (
          <WrapItem>
            <Box
              key={i}
              role={"group"}
              p={6}
              minW={"240px"}
              maxW={"350px"}
              minH={"450px"}
              w={"full"}
              bg={"gray.800"}
              boxShadow={"2xl"}
              rounded={"lg"}
              pos={"relative"}
              zIndex={1}
            >
              <VStack spacing={"5"}>
                <Heading>{option.heading}</Heading>
                <Divider />
                <HStack>
                  <Heading
                    style={{
                      textDecorationLine: "line-through",
                      textDecorationStyle: "solid",
                    }}
                  >
                    ${option.price}
                  </Heading>
                  <Heading>$0</Heading>
                </HStack>
                <VStack>
                  {option.perks.map((perk) => {
                    return (
                      <HStack
                        rounded="3xl"
                        shadow={"dark-lg"}
                        bgColor="gray.800"
                        p="3"
                      >
                        <CheckIcon color="green.600" />
                        <Text>{perk}</Text>
                      </HStack>
                    );
                  })}
                </VStack>
                <Button
                  position="absolute"
                  bottom={"5"}
                  width={"80%"}
                  bgColor={option.color}
                  size="lg"
                  disabled={true}
                >
                  Purchase
                </Button>
              </VStack>
            </Box>
          </WrapItem>
        );
      })}
    </Wrap>
  );
}
