import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { RiMenuLine } from 'react-icons/ri';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';

import { Logo } from './Logo';
import { NotificationsNav } from './NotificationsNav';
import { Profile } from './Profile';
import { SearchBox } from './SearchBox';

export function Header() {
  const { onOpen } = useSidebarDrawer();

  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
      setMounted(true)
  }, [])

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  const isMediumVersion = useBreakpointValue({
    base: false,
    md: true
  })

  return mounted && (
    <Flex
      as="header"
      w="100%"
      maxW={1220}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isWideVersion && 
        <IconButton
          aria-label="Abrir navegação"
          icon={<Icon as={RiMenuLine}/>}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        />
      }

      <Logo />
      {isMediumVersion && <SearchBox />}
      <Flex
        align="center"
        ml="auto"
      >
        <NotificationsNav />
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}