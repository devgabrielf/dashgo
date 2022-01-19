import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData: boolean
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && 
        <Box mr="4" textAlign="right">
          <Text>
            Gabriel Ferreira
          </Text>
          <Text color="gray.300" fontSize="small">
            gabriel.ferreira5584@gmail.com
          </Text>
        </Box>
      }
      <Avatar size="md" name="Gabriel Ferreira" src="https://github.com/devgabrielf.png" />
    </Flex>
  );
}