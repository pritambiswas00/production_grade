import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { AddAccount } from '../pages/AddAccount/AddAccount';

describe('AddAccount component', () => {
  jest.mock('../API/loginService', () => ({
    signUp: jest.fn().mockResolvedValue(['Successfully added new user', null]),
  }));
  test('renders correctly', () => {
    render(<AddAccount />);
    const createAccountTitle = screen.getByText('Create An Account');
    expect(createAccountTitle).toBeInTheDocument();
  });
});
