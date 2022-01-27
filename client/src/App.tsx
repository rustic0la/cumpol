import React, { FC } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/Topics';
import Auth from './pages/Auth';
import { AuthProvider, RequireAuth } from './providers/AuthProvider';
import { GridStyled, LayoutStyled } from './styles';

// TODO: themes
// ffffff-00fff6-1ba5ab-364b60
// ffbda0-ffa780-ff7b40-ff4f00-ff0000-c00000-800000-400000-200000

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
            <Route index element={<h1>Add first space</h1>} />
            <Route path=":spaceId" element={<MainContent />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
};

const Layout: FC = () => {
  return (
    <LayoutStyled>
      <Header />
      <Outlet />
    </LayoutStyled>
  );
};

const MainPage: FC = () => {
  return (
    <GridStyled>
      <Sidebar />
      <Outlet />
    </GridStyled>
  );
};

export default App;
