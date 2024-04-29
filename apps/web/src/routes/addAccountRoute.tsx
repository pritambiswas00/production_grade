import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './rootRoute';
import { AddAccount } from '../pages/AddAccount/AddAccount';

export const addAccountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/create',
  component: AddAccount,
});
