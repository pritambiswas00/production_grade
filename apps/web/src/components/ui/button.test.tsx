import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { Button } from './button';

describe('Button component', () => {
  it('renders button with specific variant and size', () => {
    const { getByRole } = render(
      <Button variant="destructive" size="sm">
        Delete
      </Button>,
    );
    const button = getByRole('button');
    expect(button).toHaveClass('bg-destructive');
    expect(button).toHaveClass('text-destructive-foreground');
    expect(button).toHaveClass('h-8');
    expect(button).toHaveClass('rounded-md');
    expect(button).toHaveClass('px-3');
    expect(button).toHaveClass('text-xs');
    expect(button).toHaveTextContent('Delete');
  });

  it('fires onClick event when clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <Button onClick={handleClick}>Click me</Button>,
    );
    const button = getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables the button when disabled prop is true', () => {
    const { getByRole } = render(<Button disabled>Click me</Button>);
    const button = getByRole('button');
    expect(button).toBeDisabled();
  });

  it('does not render as a button when asChild prop is true', () => {
    const { queryByRole } = render(<Button asChild>Click me</Button>);
    const button = queryByRole('button');
    expect(button).toBeNull();
  });
});
