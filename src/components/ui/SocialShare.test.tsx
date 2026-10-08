import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderComponent, screen, waitFor } from '../../test/utils';
import { SocialShare } from './SocialShare';
import { toast } from './Toast';

// Mock the toast utility
vi.mock('./Toast', async () => {
  const actual = await vi.importActual('./Toast');
  return {
    ...actual,
    toast: {
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

// Mock navigator.clipboard
const mockClipboard = {
  writeText: vi.fn().mockResolvedValue(undefined),
};
Object.defineProperty(navigator, 'clipboard', {
  value: mockClipboard,
});

describe('SocialShare', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock window.location.href
    Object.defineProperty(window, 'location', {
      value: {
        href: 'https://example.com/blog/test-post',
      },
      writable: true,
      configurable: true,
    });
  });

  it('renders all social share buttons', () => {
    renderComponent(<SocialShare title="Test Post" />);

    expect(screen.getByLabelText('Share on Twitter')).toBeDefined();
    expect(screen.getByLabelText('Share on LinkedIn')).toBeDefined();
    expect(screen.getByLabelText('Share on Facebook')).toBeDefined();
    expect(screen.getByLabelText('Copy link to clipboard')).toBeDefined();
  });

  it('uses the provided URL instead of current window URL', () => {
    const customUrl = 'https://custom.com/post';
    renderComponent(<SocialShare url={customUrl} title="Test Post" />);

    const twitterLink = screen.getByLabelText('Share on Twitter');
    expect(twitterLink.getAttribute('href')).toContain(encodeURIComponent(customUrl));
  });

  it('renders vertically when specified', () => {
    const { container } = renderComponent(<SocialShare orientation="vertical" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('flex-col');
  });

  it('shows labels when specified', () => {
    renderComponent(<SocialShare showLabels={true} />);
    expect(screen.getByText('Twitter')).toBeDefined();
    expect(screen.getByText('LinkedIn')).toBeDefined();
    expect(screen.getByText('Facebook')).toBeDefined();
  });

  it('copies the URL to clipboard when copy button is clicked', async () => {
    renderComponent(<SocialShare url="https://test.com" />);

    const copyButton = screen.getByLabelText('Copy link to clipboard');
    fireEvent.click(copyButton);

    expect(mockClipboard.writeText).toHaveBeenCalledWith('https://test.com');

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Link copied to clipboard');
    });
  });

  it('triggers demo modal when a social link is clicked', () => {
    renderComponent(<SocialShare />);

    const twitterLink = screen.getByLabelText('Share on Twitter');
    fireEvent.click(twitterLink);

    // The DemoLink should open the modal
    expect(screen.getByRole('dialog')).toBeDefined();
    expect(screen.getByText('Social Media Link')).toBeDefined();
  });
});
