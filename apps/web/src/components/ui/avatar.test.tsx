import '@testing-library/jest-dom'; // Import toHaveClass and toBeInTheDocument matchers
import { RefObject } from 'react';
import { render, screen } from '@testing-library/react';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';

describe('Avatar Component', () => {
  test('renders Avatar component with correct props', () => {
    render(<Avatar className="test-avatar" data-testid="avatar-root" />);
    const avatarElement = screen.getByTestId('avatar-root');
    expect(avatarElement).toBeInTheDocument();
    expect(avatarElement).toHaveClass('test-avatar');
  });

  test('forwards ref to Avatar component', () => {
    const ref: RefObject<HTMLSpanElement> = {
      current: document.createElement('span'),
    };
    render(<Avatar ref={ref} />);
    expect(ref.current).toBeInTheDocument();
  });

  test('forwards ref to AvatarImage component within Avatar', () => {
    const ref: RefObject<HTMLSpanElement> = {
      current: document.createElement('span'),
    };
    render(
      <Avatar ref={ref} data-testid="avatar-image">
        <AvatarImage />
      </Avatar>,
    );
    const imageElement = screen.getByTestId('avatar-image');
    expect(imageElement).toBeInTheDocument();
  });

  test('forwards ref to AvatarFallback component', () => {
    const ref: RefObject<HTMLSpanElement> = {
      current: document.createElement('span'),
    };
    render(
      <Avatar>
        <AvatarFallback ref={ref} />
      </Avatar>,
    );
    expect(ref.current).toBeInTheDocument();
  });
});

describe('AvatarFallback Component', () => {
  test('forwards ref to AvatarFallback component within Avatar', () => {
    const ref: RefObject<HTMLSpanElement> = { current: null };
    render(
      <Avatar>
        <AvatarFallback ref={ref} />
      </Avatar>,
    );
    expect(ref.current).toBeInTheDocument();
  });
});
