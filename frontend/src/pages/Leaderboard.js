import {
  Divider,
  Heading,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Table,
  VStack,
  Avatar,
} from "@chakra-ui/react";

import {Link} from 'react-router-dom'
import { useEffect, useState } from "react";
import { get_users } from "../action_functions/get_users";
import { moneyConvert } from "../utils/moneyConvert";

function Leaderboard() {
  const [users, setUsers] = useState([
    { username: "Misha", email: "", money: 3543, stocks: {} },
    { username: "Alex", email: "", money: 432, stocks: {} },
  ]);

  useEffect(()=> {
    get_users().then((_users)=> {
      setUsers(_users)
    })
  }, [])

  return (
    <VStack spacing={"5"}>
      <Heading>Leaderboard</Heading>
      <Divider />
      <TableContainer
        rounded={"3xl"}
        shadow="dark-lg"
        color="gray.50"
        mb="5"
        p="8"
        minWidth={"70%"}
        bgColor="gray.800"
      >
        <Table>
          <Thead >
            <Tr>
              <Th>Rank</Th>
              <Th>Username</Th>
              <Th>Money</Th>
              <Th>Profile</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user, i) => {
              return (
                <Tr>
                  <Td>{i + 1}</Td>
                  <Td>{user.username}</Td>
                  <Td>${moneyConvert(user.money)}</Td>
                  <Td><Avatar as={Link} to={`/profile/${user.username}`} name={user.username} /></Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
}

export default Leaderboard;
