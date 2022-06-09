import React from 'react';
import { Routes } from 'react-router-dom';
import { RouterProps } from './config';
import RouteWithChildren from './RouteWithChildren';

const Router = (props: { routes: RouterProps[] }) => {
  const { routes } = props;
  return <Routes>{routes ? routes.map(item => RouteWithChildren({ ...item })) : null}</Routes>;
};

export default Router;
