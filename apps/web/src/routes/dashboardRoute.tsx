import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './rootRoute';
import { PrivateDashBoard } from '../pages/ProtectedRoute/ProtectedRoute';

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: PrivateDashBoard,
});
