import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components/sections/NotFound';

// Mock motion/react
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
    h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h1 {...props}>{children}</h1>
    ),
    h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2 {...props}>{children}</h2>
    ),
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p {...props}>{children}</p>
    ),
  },
}));

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  Home: () => <div data-testid="home-icon" />,
  Search: () => <div data-testid="search-icon" />,
  ArrowRight: () => <div data-testid="arrow-right-icon" />,
  Ghost: () => <div data-testid="ghost-icon" />,
}));

describe('NotFound Component', () => {
  it('renders the 404 error code and title', () => {
    render(<NotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('renders the helpful error message', () => {
    render(<NotFound />);
    expect(
      screen.getByText(/Oops! The page you're looking for doesn't exist/i),
    ).toBeInTheDocument();
  });

  it('renders the navigation buttons with correct links', () => {
    render(<NotFound />);

    const homeLink = screen.getByRole('link', { name: /back to home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');

    const featuresLink = screen.getByRole('link', { name: /view features/i });
    expect(featuresLink).toBeInTheDocument();
    expect(featuresLink).toHaveAttribute('href', '/features/');
  });

  it('renders the search form', () => {
    render(<NotFound />);
    expect(screen.getByPlaceholderText(/search our site/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('renders popular page links', () => {
    render(<NotFound />);
    expect(screen.getByText(/popular pages/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Features' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Pricing' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Blog' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
  });
});
