import * as React from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Home from '../pages/Home/Home';
import { Toaster } from '@/components/ui/toaster';

export const rootRoute = createRootRoute({
  component: () => (
    <React.Fragment>
      <Home />
      <Outlet />
      <Toaster />
      <TanStackRouterDevtools />
    </React.Fragment>
  ),
});
