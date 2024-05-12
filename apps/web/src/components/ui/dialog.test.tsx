import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './dialog';

describe('Dialog Component', () => {
  test('renders DialogTrigger component', () => {
    render(
      <Dialog>
        <DialogTrigger data-testid="dialog-trigger" />
      </Dialog>,
    );
    const dialogTriggerElement = screen.getByTestId('dialog-trigger');
    expect(dialogTriggerElement).toBeInTheDocument();
  });

  test('renders DialogClose component', () => {
    render(
      <Dialog>
        <DialogClose data-testid="dialog-close" />
      </Dialog>,
    );
    const dialogCloseElement = screen.getByTestId('dialog-close');
    expect(dialogCloseElement).toBeInTheDocument();
  });

  test('renders DialogHeader component with correct props', () => {
    render(
      <Dialog>
        {' '}
        <DialogHeader
          className="test-dialog-header"
          data-testid="dialog-header"
        />
      </Dialog>,
    );
    const dialogHeaderElement = screen.getByTestId('dialog-header');
    expect(dialogHeaderElement).toBeInTheDocument();
    expect(dialogHeaderElement).toHaveClass('test-dialog-header');
  });

  test('renders DialogFooter component with correct props', () => {
    render(
      <Dialog>
        {' '}
        <DialogFooter
          className="test-dialog-footer"
          data-testid="dialog-footer"
        />
      </Dialog>,
    );
    const dialogFooterElement = screen.getByTestId('dialog-footer');
    expect(dialogFooterElement).toBeInTheDocument();
    expect(dialogFooterElement).toHaveClass('test-dialog-footer');
  });

  test('renders DialogTitle component with correct props', () => {
    render(
      <Dialog>
        <DialogTitle className="test-dialog-title" data-testid="dialog-title" />
      </Dialog>,
    );
    const dialogTitleElement = screen.getByTestId('dialog-title');
    expect(dialogTitleElement).toBeInTheDocument();
    expect(dialogTitleElement).toHaveClass('test-dialog-title');
  });

  test('renders DialogDescription component with correct props', () => {
    render(
      <Dialog>
        {' '}
        <DialogDescription
          className="test-dialog-description"
          data-testid="dialog-description"
        />
      </Dialog>,
    );
    const dialogDescriptionElement = screen.getByTestId('dialog-description');
    expect(dialogDescriptionElement).toBeInTheDocument();
    expect(dialogDescriptionElement).toHaveClass('test-dialog-description');
  });
});
