import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, Flex, IconButton, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { useAuth } from 'src/providers/AuthProvider';

import logo from '../../assets/logo.svg';

const Header = () => {
  const { username, token, logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();

  /**
   * const bg = useColorModeValue('red.500', 'red.200')
  const color = useColorModeValue('white', 'gray.800')
   */

  return (
    <Flex justify="space-between" alignItems="center" p="20px 40px">
      <Flex align="center" gap={6}>
        <Flex align="center" gap={3}>
          <img src={logo} alt="logo" width="50px" />
          <h1>cumpol</h1>
        </Flex>
        <IconButton
          aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          w="fit-content"
        />
      </Flex>

      {token && (
        <Flex align="center" gap={6}>
          <p>{username}</p>
          <Button size="sm" onClick={logout}>
            logout
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Header;
