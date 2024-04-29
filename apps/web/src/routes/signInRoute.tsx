import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './rootRoute';
import { SignIn } from '../pages/SignIn/SignIn';

export const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signin',
  component: SignIn,
});
