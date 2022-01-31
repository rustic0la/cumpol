import { Button, Flex, Grid, useColorMode } from '@chakra-ui/react';
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
    <Grid gridTemplateColumns="repeat(4, auto)" alignItems="center" gap={5} p="10px 40px 20px">
      <Flex align="center" gap={3}>
        <img src={logo} alt="logo" width="60px" />
        <h1>cumpol</h1>
      </Flex>
      <Button onClick={toggleColorMode}>Toggle {colorMode === 'light' ? 'Dark' : 'Light'}</Button>
      {token && (
        <>
          <p>{username}</p>
          <button onClick={logout}>logout</button>
        </>
      )}
    </Grid>
  );
};

export default Header;
