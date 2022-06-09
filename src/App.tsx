import React, { lazy, ReactNode, Suspense } from 'react';
import './App.css';
import Router from './router/Router';
import { routers } from './router/config';
import { Outlet } from 'react-router';
function App() {
  return (
    <div className='App'>
      <Router routes={routers} />
      <Outlet />
    </div>
  );
}

export default App;
