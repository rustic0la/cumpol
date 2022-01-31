import { Button, Flex, Grid, Switch, useColorMode } from '@chakra-ui/react';
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
    <Grid gridTemplateColumns="repeat(4, auto)" alignItems="center" gap={5} p="20px 40px">
      <Flex align="center" gap={3}>
        <img src={logo} alt="logo" width="60px" />
        <h1>cumpol</h1>
      </Flex>
      <div>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'} <Switch onChange={toggleColorMode} />
      </div>
      {token && (
        <>
          <p>{username}</p>
          <Button size="sm" onClick={logout}>
            logout
          </Button>
        </>
      )}
    </Grid>
  );
};

export default Header;
