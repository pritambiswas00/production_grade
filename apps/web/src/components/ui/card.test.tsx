import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './card';

describe('Card Component', () => {
  test('renders Card component with correct props', () => {
    render(<Card className="test-card" data-testid="card-root" />);
    const cardElement = screen.getByTestId('card-root');
    expect(cardElement).toBeInTheDocument();
    expect(cardElement).toHaveClass('test-card');
  });

  test('forwards ref to Card component', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Card ref={ref} />);
    expect(ref.current).toBeInTheDocument();
  });
});

describe('CardHeader Component', () => {
  test('renders CardHeader component with correct props', () => {
    render(
      <CardHeader className="test-card-header" data-testid="card-header" />,
    );
    const cardHeaderElement = screen.getByTestId('card-header');
    expect(cardHeaderElement).toBeInTheDocument();
    expect(cardHeaderElement).toHaveClass('test-card-header');
  });

  test('forwards ref to CardHeader component', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<CardHeader ref={ref} />);
    expect(ref.current).toBeInTheDocument();
  });
});

describe('CardFooter Component', () => {
  test('renders CardFooter component with correct props', () => {
    render(
      <CardFooter className="test-card-footer" data-testid="card-footer" />,
    );
    const cardFooterElement = screen.getByTestId('card-footer');
    expect(cardFooterElement).toBeInTheDocument();
    expect(cardFooterElement).toHaveClass('test-card-footer');
  });

  test('forwards ref to CardFooter component', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<CardFooter ref={ref} />);
    expect(ref.current).toBeInTheDocument();
  });
});

describe('CardTitle Component', () => {
  test('renders CardTitle component with correct props', () => {
    render(<CardTitle className="test-card-title" data-testid="card-title" />);
    const cardTitleElement = screen.getByTestId('card-title');
    expect(cardTitleElement).toBeInTheDocument();
    expect(cardTitleElement).toHaveClass('test-card-title');
  });

  test('forwards ref to CardTitle component', () => {
    const ref = React.createRef<HTMLParagraphElement>();
    render(<CardTitle ref={ref} />);
    expect(ref.current).toBeInTheDocument();
  });
});

describe('CardDescription Component', () => {
  test('renders CardDescription component with correct props', () => {
    render(
      <CardDescription
        className="test-card-description"
        data-testid="card-description"
      />,
    );
    const cardDescriptionElement = screen.getByTestId('card-description');
    expect(cardDescriptionElement).toBeInTheDocument();
    expect(cardDescriptionElement).toHaveClass('test-card-description');
  });

  test('forwards ref to CardDescription component', () => {
    const ref = React.createRef<HTMLParagraphElement>();
    render(<CardDescription ref={ref} />);
    expect(ref.current).toBeInTheDocument();
  });
});

describe('CardContent Component', () => {
  test('renders CardContent component with correct props', () => {
    render(
      <CardContent className="test-card-content" data-testid="card-content" />,
    );
    const cardContentElement = screen.getByTestId('card-content');
    expect(cardContentElement).toBeInTheDocument();
    expect(cardContentElement).toHaveClass('test-card-content');
  });

  test('forwards ref to CardContent component', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<CardContent ref={ref} />);
    expect(ref.current).toBeInTheDocument();
  });
});
