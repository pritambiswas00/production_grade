import * as React from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Home from '../pages/Home/Home';

export const rootRoute = createRootRoute({
  component: () => (
    <React.Fragment>
      <Home />
      <Outlet />
      <TanStackRouterDevtools />
    </React.Fragment>
  ),
});
