import { Box, Flex, Heading, Divider, VStack, SimpleGrid, HStack, Button  } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query';

import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string
}

const createUserFormSchema = yup.object().shape({
  name: yup.string()
           .required('Nome obrigatório'),
  email: yup.string()
            .required('E-mail obrigatório')
            .email('E-mail inválido'),
  password: yup.string()
               .required('Senha obrigatória'),
  password_confirmation: yup.string()
                           .oneOf([
                             null, yup.ref('password')
                            ], 'As senhas precisam ser iguais')
})

export default function CreateUser() {
  const router = useRouter();
  
  const createUser = useMutation(async (user: CreateUserFormData) => {
    const response = await api.post('users', {
      user: {
        ...user,
        created_at: new Date()
      }
    });

    return response.data.user;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    },
  });
  
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema)
  })

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await createUser.mutateAsync(values);

    router.push('/users');
  }

  return (
    <Box>
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
          as="form"
          flex="1"
          borderRadius="8"
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">Criar usuário</Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing="8">
            <SimpleGrid
              w="100%"
              minChildWidth={240}
              spacing={["6", "8"]}
            >
              <Input
                name="name"
                label="Nome completo"
                error={formState.errors.name}
                {...register('name')}
              />
              <Input
                name="email"
                type="email"
                label="E-mail"
                error={formState.errors.email}
                {...register('email')}
              />
            </SimpleGrid>
            <SimpleGrid
              w="100%"
              minChildWidth={240}
              spacing={["6", "8"]}
            >
              <Input
                name="password"
                type="password"
                label="Senha"
                error={formState.errors.password}
                {...register('password')}
              />
              <Input
                name="password_confirmation"
                type="password"
                label="Confirmação da senha"
                error={formState.errors.password_confirmation}
                {...register('password_confirmation')}
              />
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" bg="gray.900" colorScheme="">Cancelar</Button>
              </Link>
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}