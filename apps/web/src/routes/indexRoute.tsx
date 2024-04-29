import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './rootRoute';
import { IndexPage } from '../pages/Index/Index';

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IndexPage,
});
