import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './rootRoute';
import { DashboardPage } from '@/pages/Dashboard/Dashboard';
import { IToDo } from '@/schema/types';

const todos: IToDo[] = [
  {
    id: 1,
    title: 'Buy groceries',
    completed: false,
    description: 'sdsdsdsd',
    created_at: new Date().toDateString(),
    updated_at: new Date().toDateString(),
  },
  {
    id: 2,
    title: 'Clean the house',
    completed: true,
    description: 'sdsdsdsd',
    created_at: new Date().toDateString(),
    updated_at: new Date().toDateString(),
  },
  {
    id: 3,
    title: 'Do laundry',
    completed: false,
    description: 'sdsdsdsd',
    created_at: new Date().toDateString(),
    updated_at: new Date().toDateString(),
  },
];

function delay(ms: number): Promise<IToDo[] | Error> {
  return new Promise((resolve) => setTimeout(() => resolve(todos), ms));
}

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
  loader: () => delay(3000),
});
