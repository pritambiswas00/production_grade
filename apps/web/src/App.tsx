import { indexRoute } from './routes/indexRoute';
import { rootRoute } from './routes/rootRoute';
import { dashboardRoute } from './routes/dashboardRoute';
import { addAccountRoute } from './routes/addAccountRoute';

export const routeTree = rootRoute.addChildren([
  indexRoute,
  addAccountRoute,
  dashboardRoute,
]);
