import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { UseCases } from './UseCases';
import { useCases } from '@/data/features';
import { ThemeProvider } from '@/components/ThemeProvider';

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

describe('UseCases Component', () => {
  const renderUseCases = (props = {}) => {
    return render(
      <ThemeProvider>
        <UseCases {...props} />
      </ThemeProvider>,
    );
  };

  it('renders the section heading correctly', () => {
    renderUseCases();
    const heading = screen.getByRole('heading', {
      name: /Solutions for every team/i,
    });
    expect(heading).toBeDefined();
  });

  it('renders all personas as tabs', () => {
    renderUseCases();
    useCases.forEach((useCase) => {
      expect(screen.getByRole('tab', { name: useCase.persona })).toBeDefined();
    });
  });

  it('displays the first use case content by default', () => {
    renderUseCases();
    const firstUseCase = useCases[0];
    if (!firstUseCase) throw new Error('No use cases found');

    expect(screen.getByText(firstUseCase.title)).toBeDefined();
    expect(screen.getByText(firstUseCase.description)).toBeDefined();
    firstUseCase.benefits.forEach((benefit) => {
      expect(screen.getByText(benefit)).toBeDefined();
    });
  });

  it('switches content when a different persona tab is clicked', async () => {
    renderUseCases();

    // Get the second use case
    const secondUseCase = useCases[1];
    if (!secondUseCase) throw new Error('Less than 2 use cases found');

    // Click the second tab
    const tab = screen.getByRole('tab', { name: secondUseCase.persona });
    fireEvent.click(tab);

    // Verify that the second use case content is present
    expect(screen.getByText(secondUseCase.title)).toBeDefined();
    expect(screen.getByText(secondUseCase.description)).toBeDefined();
    secondUseCase.benefits.forEach((benefit) => {
      expect(screen.getByText(benefit)).toBeDefined();
    });
  });

  it('renders the section with correct role and label', () => {
    renderUseCases();
    const section = screen.getByRole('region', { name: /Use Cases/i });
    expect(section).toBeDefined();
  });
});
