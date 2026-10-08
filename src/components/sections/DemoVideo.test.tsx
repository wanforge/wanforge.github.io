import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DemoVideo } from './DemoVideo';
import { ThemeProvider } from '../../components/ThemeProvider';

// Mock matchMedia for ThemeProvider
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

describe('DemoVideo Component', () => {
  const renderDemoVideo = (props = {}) => {
    return render(
      <ThemeProvider>
        <DemoVideo {...props} />
      </ThemeProvider>,
    );
  };

  it('renders the section heading correctly', () => {
    renderDemoVideo({ heading: 'Custom Heading' });
    expect(screen.getByText('Custom Heading')).toBeDefined();
  });

  it('renders the subheading correctly', () => {
    renderDemoVideo({ subheading: 'Custom Subheading' });
    expect(screen.getByText('Custom Subheading')).toBeDefined();
  });

  it('renders the play button', () => {
    renderDemoVideo();
    // The play button is inside a DemoLink which is a role="button" when in demo mode
    const playButton = screen.getByRole('button');
    expect(playButton).toBeDefined();
  });

  it('renders the thumbnail image', () => {
    renderDemoVideo({ thumbnailUrl: 'test-thumbnail.jpg' });
    const img = screen.getByAltText('Product Demo Video');
    expect(img).toBeDefined();
    // getAssetPath might add a leading slash or base path, but we check if it includes the filename
    expect(img.getAttribute('src')).toContain('test-thumbnail.jpg');
  });
});
