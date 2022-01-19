import { Text, Link as ChakraLink, textDecoration } from '@chakra-ui/react';
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/dashboard" passHref>
      <ChakraLink
        _hover={{
          textDecoration: 'none'
        }}
      >
        <Text
          w="32"
          fontSize={["2xl", "3xl"]}
          fontWeight="bold"
          letterSpacing="tight"
          userSelect="none"
          cursor="pointer"
        >
          dashgo
          <Text
            as="span"
            ml="1"
            color="pink.500"
          >
            .
          </Text>
        </Text>
      </ChakraLink>
    </Link>
  );
}