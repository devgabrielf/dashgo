import { useState, useEffect } from 'react';
import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useBreakpointValue } from "@chakra-ui/react";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { SidebarNav } from "./SidebarNav";

export function Sidebar() {
  const { isOpen, onClose } = useSidebarDrawer();

  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
      setMounted(true)
  }, [])

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false
  })

  if(isDrawerSidebar) {
    return mounted && (
      <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      >
        <DrawerOverlay>
          <DrawerContent bg="gray.800" p="4">
            <DrawerCloseButton mt="6" />
            <DrawerHeader>Navegação</DrawerHeader>
            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return mounted && (
    <Box
      as="aside"
      w="64"
      mr="8"
    >
      <SidebarNav />
    </Box>
  );
}