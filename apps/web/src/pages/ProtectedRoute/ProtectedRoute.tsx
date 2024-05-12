import { DashboardPage } from '@/pages/Dashboard/Dashboard';
import { Navigate } from '@tanstack/react-router';
import * as React from 'react';

interface AuthProps {
  children: React.JSX.Element;
}

const isAuthenticated = (): boolean => {
  if (localStorage.getItem('secret_jwt')) return true;
  return false;
};

const Auth: React.FC<AuthProps> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" />;
  }
  return <React.Fragment>{children}</React.Fragment>;
};

export const PrivateDashBoard: React.FC = () => {
  return (
    <Auth>
      <DashboardPage />
    </Auth>
  );
};
