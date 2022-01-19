import { useState } from "react";
import NextLink from "next/link";
import { useUsers } from "../../services/hooks/useUsers";
import { queryClient } from '../../services/queryClient'
import { api } from "../../services/api";

import { Box, Button, Checkbox, Flex, Heading, Icon, Link, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

export default function UserList({ users }) {
  const [currentPage, setCurrentPage] = useState(1);
  const registersPerPage = 5;
  const { data, isLoading, isFetching, error } = useUsers(currentPage, registersPerPage);

  const isMediumVersion = useBreakpointValue({
    base: false,
    md: true
  });

  async function handlePreFetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`);

      return response.data;
    }, {
      staleTime: 1000 * 60 * 10 // 10 minutes
    });
  }

  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex
        w="100%"
        my="6"
        maxW={1220}
        mx="auto"
        px="6"
      >
        <Sidebar />
        <Box
          flex="1"
          borderRadius="8"
          bg="gray.800"
          p="8"
        >
          <Flex
            mb="8"
            align="center"
            justify="space-between"
          >
            <Heading size="lg" fontWeight="normal">
              Usuários
              {isFetching && !isLoading && 
                <Spinner
                  size="sm"
                  color="gray.500"
                  ml="4"
                />
              }
            </Heading>
            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                cursor="pointer"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>
          { isLoading ?
            <Flex justify="center">
              <Spinner />
            </Flex>
          : error ?
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários</Text>
            </Flex>
          :
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th w="8" px={["4", "4", "6"]} color="gray.300">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isMediumVersion && <Th>Data de cadastro</Th>}
                    {isMediumVersion && <Th w="8"></Th>}
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users.map(user => {
                    return (
                      <Tr key={user.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Link onMouseEnter={() => handlePreFetchUser(user.id)}>
                              <Text fontWeight="bold">{user.name}</Text>
                            </Link>
                            <Text fontSize="sm" color="gray.300">{user.email}</Text>
                          </Box>
                        </Td>
                        {isMediumVersion && <Td>{user.created_at}</Td>}
                        {isMediumVersion && 
                          <Td>
                              <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="facebook"
                                cursor="pointer"
                                leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                              >
                                Editar
                              </Button>
                          </Td>
                        }
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
              <Pagination
                totalCountRegisters={data.totalCount}
                registersPerPage={registersPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </>
          }
        </Box>
      </Flex>
    </Flex>
  );
}