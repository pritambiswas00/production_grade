import React from 'react';
import ReactDOM from 'react-dom/client';
import { routeTree } from './App';
import './index.css';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { ThemeProvider } from './components/ui/theme-provider';
const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
