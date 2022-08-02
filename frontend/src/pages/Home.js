import {
    Box,
    chakra,
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { BsPerson } from 'react-icons/bs';
  import { AiOutlineStock } from 'react-icons/ai';
  import { HiOutlineDesktopComputer } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { get_users } from '../action_functions/get_users';
  
  
  function StatsCard(props) {
    const { title, stat, icon } = props;
    return (
      <Stat
        px={{ base: 2, md: 4 }}
        py={'5'}
        shadow={'xl'}
        border={'1px solid'}
        borderColor={useColorModeValue('gray.800', 'gray.500')}
        rounded={'lg'}>
        <Flex justifyContent={'space-between'}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={'medium'} isTruncated>
              {title}
            </StatLabel>
            <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
              {stat}
            </StatNumber>
          </Box>
          <Box
            my={'auto'}
            color={useColorModeValue('gray.800', 'gray.200')}
            alignContent={'center'}>
            {icon}
          </Box>
        </Flex>
      </Stat>
    );
  }
  
  export default function Home() {
    const [userCount, setUserCount] = useState(0)
    useEffect(()=> {
      get_users().then((users)=>{
        setUserCount(users.length)
      })  
    }, [])
    return (
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={'center'}
          fontSize={'4xl'}
          py={10}
          fontWeight={'bold'}>
          Our company is expanding, you could be too.
        </chakra.h1>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            title={'Users'}
            stat={userCount}
            icon={<BsPerson size={'3em'} />}
          />
          <StatsCard
            title={'Stocks'}
            stat={'1,539'}
            icon={<AiOutlineStock size={'3em'} />}
          />
          <StatsCard
            title={'Software Engineers'}
            stat={'1'}
            icon={<HiOutlineDesktopComputer size={'3em'} />}
          />
        </SimpleGrid>
      </Box>
    );
  }