import React, { Suspense } from 'react';
import { Fragment } from 'react';
import { Navigate, Route } from 'react-router-dom';

import { RouterProps } from './config';

const RouteWithChildren = (data: RouterProps) => {
  return (
    <Fragment key={data.path}>
      <Route
        path={data.path}
        caseSensitive={data.caseSensitive}
        element={
          <Suspense fallback={data.fallback || <>这是被迫展示的页面</>}>
            {data.redirect ? <Navigate to={data.redirect} /> : <data.element />}
          </Suspense>
        }
      ></Route>
      {data.children && data.children.length
        ? data.children.map(el => RouteWithChildren({ ...el }))
        : null}
    </Fragment>
  );
};

export default RouteWithChildren;
