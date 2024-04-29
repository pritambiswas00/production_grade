import { indexRoute } from './routes/indexRoute';
import { rootRoute } from './routes/rootRoute';
import { dashboardRoute } from './routes/dashboardRoute';
import { signInRoute } from './routes/signInRoute';
import { addAccountRoute } from './routes/addAccountRoute';

export const routeTree = rootRoute.addChildren([
  indexRoute,
  signInRoute,
  addAccountRoute,
  dashboardRoute,
]);
