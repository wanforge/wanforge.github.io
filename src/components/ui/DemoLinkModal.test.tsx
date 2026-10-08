/**
 * DemoLinkModal Component Tests
 *
 * Comprehensive test suite for the Demo Link Modal component.
 *
 * @module components/ui
 */

import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DemoLinkModal, useDemoLinkModal } from './DemoLinkModal';
import { DemoLink, DemoLinkButton } from './DemoLink';

describe('DemoLinkModal Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    url: '/dashboard',
  };

  describe('Basic Rendering', () => {
    it('renders when isOpen is true', () => {
      render(<DemoLinkModal {...defaultProps} />);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('does not render when isOpen is false', () => {
      render(<DemoLinkModal {...defaultProps} isOpen={false} />);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders with correct title based on URL category', () => {
      render(<DemoLinkModal {...defaultProps} url="/dashboard" />);

      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Dashboard Feature');
    });

    it('renders with authentication title for auth URLs', () => {
      render(<DemoLinkModal {...defaultProps} url="/login" />);

      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
        'Authentication Required',
      );
    });

    it('renders with social title for social URLs', () => {
      render(<DemoLinkModal {...defaultProps} url="https://twitter.com/test" />);

      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Social Media Link');
    });

    it('renders with integration title for integration URLs', () => {
      render(<DemoLinkModal {...defaultProps} url="/integrations/slack" />);

      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('External Integration');
    });

    it('displays the URL in the modal', () => {
      render(<DemoLinkModal {...defaultProps} url="/dashboard" />);

      expect(screen.getByText('/dashboard')).toBeInTheDocument();
    });

    it('uses custom title when provided', () => {
      render(<DemoLinkModal {...defaultProps} title="Custom Title" />);

      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Custom Title');
    });

    it('uses custom message when provided', () => {
      render(<DemoLinkModal {...defaultProps} message="Custom message text" />);

      expect(screen.getByText('Custom message text')).toBeInTheDocument();
    });

    it('uses custom description when provided', () => {
      render(<DemoLinkModal {...defaultProps} description="Custom description text" />);

      expect(screen.getByText('Custom description text')).toBeInTheDocument();
    });
  });

  describe('Close Functionality', () => {
    it('calls onClose when close button is clicked', async () => {
      const onClose = vi.fn();
      render(<DemoLinkModal {...defaultProps} onClose={onClose} />);

      const closeButton = screen.getByLabelText('Close modal');
      await userEvent.click(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when clicking outside the modal card', async () => {
      const onClose = vi.fn();
      render(<DemoLinkModal {...defaultProps} onClose={onClose} />);

      // Find the modal container (dialog) and click on it outside the card
      const modalContainer = screen.getByRole('dialog');
      await userEvent.click(modalContainer);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when clicking inside the modal card', async () => {
      const onClose = vi.fn();
      render(<DemoLinkModal {...defaultProps} onClose={onClose} />);

      // Click inside the modal card (on the title)
      const title = screen.getByRole('heading', { level: 2 });
      await userEvent.click(title);

      expect(onClose).not.toHaveBeenCalled();
    });

    it('calls onClose when Close button is clicked', async () => {
      const onClose = vi.fn();
      render(<DemoLinkModal {...defaultProps} onClose={onClose} />);

      const closeButton = screen.getByRole('button', { name: 'Close' });
      await userEvent.click(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when Escape key is pressed', () => {
      const onClose = vi.fn();
      render(<DemoLinkModal {...defaultProps} onClose={onClose} />);

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Copy Functionality', () => {
    it('has a copy URL button', () => {
      render(<DemoLinkModal {...defaultProps} />);

      expect(screen.getByRole('button', { name: /copy link url/i })).toBeInTheDocument();
    });

    it('shows copied state after clicking copy button', async () => {
      // Mock clipboard API
      const mockClipboard = {
        writeText: vi.fn().mockResolvedValue(undefined),
      };
      Object.assign(navigator, { clipboard: mockClipboard });

      render(<DemoLinkModal {...defaultProps} url="/test-url" />);

      const copyButton = screen.getByRole('button', { name: /copy link url/i });
      await userEvent.click(copyButton);

      await waitFor(() => {
        expect(screen.getByText('Copied!')).toBeInTheDocument();
      });
    });

    it('calls onCopy callback when URL is copied', async () => {
      const onModalCopy = vi.fn();
      const mockClipboard = {
        writeText: vi.fn().mockResolvedValue(undefined),
      };
      Object.assign(navigator, { clipboard: mockClipboard });

      render(<DemoLinkModal {...defaultProps} url="/test-url" onModalCopy={onModalCopy} />);

      const copyButton = screen.getByRole('button', { name: /copy link url/i });
      await userEvent.click(copyButton);

      await waitFor(() => {
        expect(onModalCopy).toHaveBeenCalledWith('/test-url');
      });
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      render(<DemoLinkModal {...defaultProps} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-labelledby', 'demo-link-modal-title');
      expect(dialog).toHaveAttribute('aria-describedby', 'demo-link-modal-description');
    });

    it('title has correct id for aria-labelledby', () => {
      render(<DemoLinkModal {...defaultProps} />);

      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toHaveAttribute('id', 'demo-link-modal-title');
    });

    it('close button has accessible label', () => {
      render(<DemoLinkModal {...defaultProps} />);

      expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
    });

    it('traps focus within the modal', async () => {
      render(<DemoLinkModal {...defaultProps} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();

      // Get all focusable elements
      const focusableElements = screen.getAllByRole('button');
      expect(focusableElements.length).toBeGreaterThan(0);
    });
  });

  describe('Different URL Categories', () => {
    const testCases = [
      { url: '/login', expectedTitle: 'Authentication Required' },
      { url: '/signup', expectedTitle: 'Authentication Required' },
      { url: '/dashboard', expectedTitle: 'Dashboard Feature' },
      { url: '/app/settings', expectedTitle: 'Dashboard Feature' },
      { url: '/integrations/slack', expectedTitle: 'External Integration' },
      { url: 'https://twitter.com/test', expectedTitle: 'Social Media Link' },
      { url: 'https://github.com/test', expectedTitle: 'Social Media Link' },
      { url: 'https://example.com', expectedTitle: 'External Link' },
    ];

    testCases.forEach(({ url, expectedTitle }) => {
      it(`shows correct title for ${url}`, () => {
        render(<DemoLinkModal {...defaultProps} url={url} />);

        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(expectedTitle);
      });
    });
  });
});

describe('useDemoLinkModal Hook', () => {
  it('returns correct initial state', () => {
    let result: ReturnType<typeof useDemoLinkModal> | undefined;

    function TestComponent() {
      result = useDemoLinkModal();
      return null;
    }

    render(<TestComponent />);

    expect(result).toEqual({
      isOpen: false,
      url: '',
      openModal: expect.any(Function),
      closeModal: expect.any(Function),
    });
  });

  it('opens modal with URL when openModal is called', async () => {
    let result: ReturnType<typeof useDemoLinkModal> | undefined;

    function TestComponent() {
      result = useDemoLinkModal();
      return (
        <DemoLinkModal isOpen={result!.isOpen} onClose={result!.closeModal} url={result!.url} />
      );
    }

    render(<TestComponent />);

    // Open the modal
    result!.openModal('/test-url');

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  it('closes modal when closeModal is called', async () => {
    let result: ReturnType<typeof useDemoLinkModal> | undefined;

    function TestComponent() {
      result = useDemoLinkModal();
      return (
        <DemoLinkModal isOpen={result!.isOpen} onClose={result!.closeModal} url={result!.url} />
      );
    }

    render(<TestComponent />);

    // Open then close the modal
    result!.openModal('/test-url');
    result!.closeModal();

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});

describe('DemoLink Component', () => {
  describe('Rendering', () => {
    it('renders as an anchor tag', () => {
      render(<DemoLink href="/test">Test Link</DemoLink>);

      const link = screen.getByText('Test Link');
      expect(link.tagName.toLowerCase()).toBe('a');
      expect(link).toHaveAttribute('href', '/test/');
    });

    it('applies custom className', () => {
      render(
        <DemoLink href="/test" className="custom-class">
          Test Link
        </DemoLink>,
      );

      expect(screen.getByText('Test Link')).toHaveClass('custom-class');
    });

    it('applies title attribute', () => {
      render(
        <DemoLink href="/test" title="Test Title">
          Test Link
        </DemoLink>,
      );

      expect(screen.getByText('Test Link')).toHaveAttribute('title', 'Test Title');
    });
  });

  describe('Demo Mode Detection', () => {
    it('shows modal for demo links when clicked', async () => {
      render(<DemoLink href="/dashboard">Dashboard</DemoLink>);

      const link = screen.getByText('Dashboard');
      await userEvent.click(link);

      // Modal should appear
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });

    it('prevents default navigation for demo links', async () => {
      render(
        <DemoLink href="/dashboard" forceDemo>
          Dashboard
        </DemoLink>,
      );

      const link = screen.getByText('Dashboard');
      const event = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      fireEvent(link, event);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('Custom Modal Content', () => {
    it('uses custom modal title when provided', async () => {
      render(
        <DemoLink href="/test" forceDemo modalTitle="Custom Modal Title">
          Test Link
        </DemoLink>,
      );

      const link = screen.getByText('Test Link');
      await userEvent.click(link);

      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Custom Modal Title');
      });
    });

    it('uses custom modal message when provided', async () => {
      render(
        <DemoLink href="/test" forceDemo modalMessage="Custom modal message text">
          Test Link
        </DemoLink>,
      );

      const link = screen.getByText('Test Link');
      await userEvent.click(link);

      await waitFor(() => {
        expect(screen.getByText('Custom modal message text')).toBeInTheDocument();
      });
    });
  });

  describe('Callbacks', () => {
    it('calls onModalOpen when modal is opened', async () => {
      const onModalOpen = vi.fn();
      render(
        <DemoLink href="/dashboard" onModalOpen={onModalOpen}>
          Dashboard
        </DemoLink>,
      );

      const link = screen.getByText('Dashboard');
      await userEvent.click(link);

      expect(onModalOpen).toHaveBeenCalledWith('/dashboard/');
    });

    it('calls onModalClose when modal is closed', async () => {
      const onModalClose = vi.fn();
      render(
        <DemoLink href="/dashboard" onModalClose={onModalClose}>
          Dashboard
        </DemoLink>,
      );

      // Open modal
      const link = screen.getByText('Dashboard');
      await userEvent.click(link);

      // Close modal
      const closeButton = screen.getByLabelText('Close modal');
      await userEvent.click(closeButton);

      expect(onModalClose).toHaveBeenCalled();
    });
  });
});

describe('DemoLinkButton Component', () => {
  it('renders with button styling', () => {
    render(
      <DemoLinkButton href="/test" forceDemo>
        Test Button
      </DemoLinkButton>,
    );

    const link = screen.getByText('Test Button');
    expect(link).toHaveClass('inline-flex');
    expect(link).toHaveClass('rounded-lg');
  });

  it('applies variant styles', () => {
    render(
      <DemoLinkButton href="/test" forceDemo variant="secondary">
        Test Button
      </DemoLinkButton>,
    );

    const link = screen.getByText('Test Button');
    expect(link).toHaveClass('bg-secondary-700');
  });

  it('applies size styles', () => {
    render(
      <DemoLinkButton href="/test" forceDemo size="lg">
        Test Button
      </DemoLinkButton>,
    );

    const link = screen.getByText('Test Button');
    expect(link).toHaveClass('px-6');
    expect(link).toHaveClass('py-3');
    expect(link).toHaveClass('text-lg');
  });

  it('applies full width style', () => {
    render(
      <DemoLinkButton href="/test" forceDemo fullWidth>
        Test Button
      </DemoLinkButton>,
    );

    expect(screen.getByText('Test Button')).toHaveClass('w-full');
  });

  it('opens modal when clicked', async () => {
    render(
      <DemoLinkButton href="/dashboard" forceDemo>
        Dashboard
      </DemoLinkButton>,
    );

    const button = screen.getByText('Dashboard');
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });
});
