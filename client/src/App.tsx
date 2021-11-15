import React, { FC } from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

import logo from './assets/logo.svg';
import { Library } from './pages/Library';
import { Feed } from './pages/Feed';
import { Youstube } from './pages/Youstube';
import { Learn } from './pages/Learn';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Library />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/youstube" element={<Youstube />} />
          <Route path="/learn" element={<Learn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const Layout: FC = () => {
  return (
    <>
      <img src={logo} alt="logo" width="70px" /> cumpol
      <li>
        <Link to="/">Library</Link>
      </li>
      <li>
        <Link to="/feed">Feed</Link>
      </li>
      <li>
        <Link to="/youstube">Youstube</Link>
      </li>
      <li>
        <Link to="/learn">Learn</Link>
      </li>
      <Outlet />
    </>
  );
};

export default App;
