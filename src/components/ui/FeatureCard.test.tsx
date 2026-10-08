import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FeatureCard } from './FeatureCard';
import { Zap } from 'lucide-react';

describe('FeatureCard', () => {
  const defaultProps = {
    icon: <Zap data-testid="icon" />,
    title: 'Test Feature',
    description: 'This is a test feature description.',
  };

  it('renders title and description correctly', () => {
    render(<FeatureCard {...defaultProps} />);

    expect(screen.getByText('Test Feature')).toBeInTheDocument();
    expect(screen.getByText('This is a test feature description.')).toBeInTheDocument();
  });

  it('renders icon correctly', () => {
    render(<FeatureCard {...defaultProps} />);

    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders link when href is provided', () => {
    render(<FeatureCard {...defaultProps} href="/test-link" linkText="Click me" />);

    const link = screen.getByRole('link', { name: /click me/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test-link/');
  });

  it('does not render link when href is not provided', () => {
    render(<FeatureCard {...defaultProps} />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('applies hover styles by default', () => {
    render(<FeatureCard {...defaultProps} data-testid="feature-card" />);

    const card = screen.getByTestId('feature-card');
    expect(card).toHaveClass('hover:-translate-y-1');
  });

  it('allows disabling hover effect', () => {
    render(<FeatureCard {...defaultProps} hover={false} data-testid="feature-card" />);

    const card = screen.getByTestId('feature-card');
    expect(card).not.toHaveClass('hover:-translate-y-1');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<FeatureCard {...defaultProps} ref={ref} data-testid="feature-card" />);

    expect(ref.current).toBe(screen.getByTestId('feature-card'));
  });

  it('applies custom className', () => {
    render(
      <FeatureCard {...defaultProps} className="custom-feature-card" data-testid="feature-card" />,
    );

    expect(screen.getByTestId('feature-card')).toHaveClass('custom-feature-card');
  });

  it('applies custom iconClassName', () => {
    render(<FeatureCard {...defaultProps} iconClassName="custom-icon-bg" />);

    // The icon container is the parent of the icon
    const icon = screen.getByTestId('icon');
    const container = icon.parentElement;
    expect(container).toHaveClass('custom-icon-bg');
  });
});
