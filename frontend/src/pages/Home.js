import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsPerson } from "react-icons/bs";
import { AiOutlineStock } from "react-icons/ai";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { useEffect, useState } from "react";
import { get_users } from "../action_functions/get_users";
import { get_stocks } from "../action_functions/get_stocks";

// import { get_users } from "../action_functions/get_users";
// import { get_stocks } from "../action_functions/get_stocks";

function StatsCard(props) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function Home() {
  const [userCount, setUserCount] = useState(0);
  const [stockCount, setStockCount] = useState(0);
  const [engineerCount, _] = useState(1);

  useEffect(() => {
    get_users().then((users) => {
      setUserCount(users.length);
    });
  }, []);
  useEffect(() => {
    get_stocks().then((stocks) => {
      setStockCount(stocks.length);
    });
  });
  return (
    <Box maxW="7xl" mx={"auto"} px={{ base: 2, sm: 12, md: 17 }}>
      <Center>
        <HStack>
          <Heading
            textAlign={"center"}
            mb="3"
            fontSize={["medium", "large", "x-large"]}
            fontWeight={"bold"}
          >
            Weclome to Nippy
          </Heading>
        </HStack>
      </Center>

      <Divider h="2" bgColor="blue.300" rounded="full" />
      <Heading
        fontSize={["medium", "large", "x-large"]}
        textAlign={"center"}
        mt="10"
        mb="5"
      >
        {" "}
        An Online Stock-Market Simulator
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={"Users"}
          stat={userCount}
          icon={<BsPerson size={"3em"} />}
        />
        <StatsCard
          title={"Stocks"}
          stat={stockCount}
          icon={<AiOutlineStock size={"3em"} />}
        />
        <StatsCard
          title={"Software Engineers"}
          stat={engineerCount}
          icon={<HiOutlineDesktopComputer size={"3em"} />}
        />
      </SimpleGrid>
    </Box>
  );
}
