import React, { FC } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { AuthProvider, RequireAuth } from './AuthContext';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Sidebar from './components/Sidebar';
import Auth from './pages/Auth';
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
            <Route index element={<h1>Select Space</h1>} />
            <Route path=":spaceId" element={<MainContent />} />
          </Route>
          <Route path="*" element={<h1>Not found</h1>} />
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
