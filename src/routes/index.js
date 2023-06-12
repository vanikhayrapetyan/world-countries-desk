import React from 'react';
import {
  HashRouter,
  Routes as RouterRoutes,
  Route
} from 'react-router-dom';

import Header from '../components/Header';
import HomePage from '../components/HomePage';

function Routes() {
  return (
    <HashRouter>
      <Header />
      <RouterRoutes>
        <Route exact path="/" element={<HomePage />} />
      </RouterRoutes>
    </HashRouter>
  );
}

export default Routes;
