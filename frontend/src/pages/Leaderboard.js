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
import { useState } from "react";

function Leaderboard() {
  const [users, setUsers] = useState([
    { username: "Misha", email: "", money: 3543, stocks: {} },
    { username: "Alex", email: "", money: 432, stocks: {} },
  ]);

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
                  <Td>${user.money}</Td>
                  <Td><Avatar name={user.username} /></Td>
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
