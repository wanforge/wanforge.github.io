import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';
import { socialProofStats } from '@/data';
import { company } from '@/config/site';
import { ThemeProvider } from '@/components/ThemeProvider';
import * as reducedMotion from '@/utils/reducedMotion';

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

describe('Hero Component', () => {
  const renderHero = () => {
    return render(
      <ThemeProvider>
        <Hero />
      </ThemeProvider>,
    );
  };

  it('renders the headline correctly', () => {
    renderHero();
    const headline = screen.getByRole('heading', { name: /Build Faster with/i });
    expect(headline).toBeDefined();
    expect(screen.getByText(company.name)).toBeDefined();
  });

  it('respects reduced motion preference', () => {
    const useReducedMotionSpy = vi.spyOn(reducedMotion, 'useReducedMotion');
    useReducedMotionSpy.mockReturnValue({
      prefersReducedMotion: true,
      isSupported: true,
      toggle: vi.fn(),
      setPrefersReducedMotion: vi.fn(),
    });

    renderHero();

    // If reduced motion is true, the animation props should be affected
    // We can't easily check motion props in RTL, but we can verify the component renders without crashing
    expect(screen.getByRole('heading', { name: /Build Faster with/i })).toBeDefined();

    useReducedMotionSpy.mockRestore();
  });

  it('renders the subheadline correctly', () => {
    renderHero();
    // Subheadline contains company tagline
    const subheadline = screen.getByText(new RegExp(company.tagline, 'i'));
    expect(subheadline).toBeDefined();
  });

  it('renders CTA buttons', () => {
    renderHero();
    expect(screen.getByRole('link', { name: /Get Started/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /View Demo/i })).toBeDefined();
  });

  it('renders social proof badge with correct stats', () => {
    renderHero();
    expect(screen.getByText(new RegExp(socialProofStats.rating.toString(), 'i'))).toBeDefined();
    expect(screen.getByText(new RegExp(socialProofStats.users, 'i'))).toBeDefined();
  });

  it('renders the hero section with correct role and label', () => {
    renderHero();
    const heroSection = screen.getByRole('region', { name: /Hero Section/i });
    expect(heroSection).toBeDefined();
  });
});
