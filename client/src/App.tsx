import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  Grid,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  theme,
  useMediaQuery,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/Topics';
import Auth from './pages/Auth';
import { AuthProvider, RequireAuth } from './providers/AuthProvider';

const App: FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <MainPage />
              </RequireAuth>
            }
          >
            <Route
              index
              element={
                <Center>
                  <h1>
                    select or create
                    <br /> a new Space 🔮
                  </h1>
                </Center>
              }
            />
            <Route path=":spaceId" element={<MainContent />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
};

const Layout: FC = () => {
  return (
    <Grid templateRows="auto 1fr" position="relative" h="100vh">
      <Header />
      <Outlet />
    </Grid>
  );
};

const MainPage: FC = () => {
  return (
    <Grid templateColumns={'15% auto'} gap={6} overflow="auto" mr={3} ml={3}>
      <Sidebar />
      <Outlet />
    </Grid>
  );
};

export default App;
