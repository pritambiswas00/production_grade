import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './rootRoute';
import { DashboardPage } from '@/pages/Dashboard/Dashboard';

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
});
