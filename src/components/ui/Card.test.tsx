import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { a11yTesting } from '@/test/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
  HoverableCard,
} from './Card';

describe('Card', () => {
  describe('Basic Rendering', () => {
    it('renders children correctly', () => {
      render(
        <Card data-testid="card">
          <p>Card content</p>
        </Card>,
      );

      expect(screen.getByTestId('card')).toBeInTheDocument();
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('renders with default props', () => {
      render(
        <Card data-testid="card">
          <p>Content</p>
        </Card>,
      );

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('bg-bg-primary');
      expect(card).toHaveClass('rounded-lg');
      expect(card).toHaveClass('p-4');
    });
  });

  describe('Variants', () => {
    it('renders default variant with shadow and border', () => {
      render(
        <Card variant="default" data-testid="card">
          <p>Content</p>
        </Card>,
      );

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('shadow-md');
      expect(card).toHaveClass('border');
      expect(card).toHaveClass('bg-bg-primary');
    });

    it('renders outlined variant with stronger border', () => {
      render(
        <Card variant="outlined" data-testid="card">
          <p>Content</p>
        </Card>,
      );

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('border-2');
      expect(card).toHaveClass('border-border-strong');
      expect(card).toHaveClass('shadow-none');
    });

    it('renders elevated variant with prominent shadow', () => {
      render(
        <Card variant="elevated" data-testid="card">
          <p>Content</p>
        </Card>,
      );

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('shadow-xl');
      expect(card).toHaveClass('bg-bg-primary');
    });

    it('renders flat variant without shadow or border', () => {
      render(
        <Card variant="flat" data-testid="card">
          <p>Content</p>
        </Card>,
      );

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('bg-bg-secondary');
      expect(card).toHaveClass('shadow-none');
      expect(card).toHaveClass('border-none');
    });
  });

  describe('Padding Sizes', () => {
    it('renders with no padding when padding="none"', () => {
      render(
        <Card padding="none" data-testid="card">
          <p>Content</p>
        </Card>,
      );

      const card = screen.getByTestId('card');
      expect(card).not.toHaveClass('p-3');
      expect(card).not.toHaveClass('p-4');
      expect(card).not.toHaveClass('p-6');
      expect(card).not.toHaveClass('p-8');
    });

    it('renders with small padding', () => {
      render(
        <Card padding="sm" data-testid="card">
          <p>Content</p>
        </Card>,
      );

      expect(screen.getByTestId('card')).toHaveClass('p-3');
    });

    it('renders with medium padding', () => {
      render(
        <Card padding="md" data-testid="card">
          <p>Content</p>
        </Card>,
      );

      expect(screen.getByTestId('card')).toHaveClass('p-4');
    });

    it('renders with large padding', () => {
      render(
        <Card padding="lg" data-testid="card">
          <p>Content</p>
        </Card>,
      );

      expect(screen.getByTestId('card')).toHaveClass('p-6');
    });

    it('renders with extra large padding', () => {
      render(
        <Card padding="xl" data-testid="card">
          <p>Content</p>
        </Card>,
      );

      expect(screen.getByTestId('card')).toHaveClass('p-8');
    });
  });

  describe('Border Radius', () => {
    it('renders with no border radius', () => {
      render(
        <Card radius="none" data-testid="card">
          <p>Content</p>
        </Card>,
      );

      expect(screen.getByTestId('card')).toHaveClass('rounded-none');
    });

    it('renders with small border radius', () => {
      render(
        <Card radius="sm" data-testid="card">
          <p>Content</p>
        </Card>,
      );

      expect(screen.getByTestId('card')).toHaveClass('rounded-sm');
    });

    it('renders with medium border radius', () => {
      render(
        <Card radius="md" data-testid="card">
          <p>Content</p>
        </Card>,
      );

      expect(screen.getByTestId('card')).toHaveClass('rounded-lg');
    });

    it('renders with large border radius', () => {
      render(
        <Card radius="lg" data-testid="card">
          <p>Content</p>
        </Card>,
      );

      expect(screen.getByTestId('card')).toHaveClass('rounded-xl');
    });

    it('renders with extra large border radius', () => {
      render(
        <Card radius="xl" data-testid="card">
          <p>Content</p>
        </Card>,
      );

      expect(screen.getByTestId('card')).toHaveClass('rounded-2xl');
    });

    it('renders with full border radius', () => {
      render(
        <Card radius="full" data-testid="card">
          <p>Content</p>
        </Card>,
      );

      expect(screen.getByTestId('card')).toHaveClass('rounded-3xl');
    });
  });

  describe('Hover Animation', () => {
    it('applies hover styles when hover prop is true', () => {
      render(
        <Card hover data-testid="card">
          <p>Content</p>
        </Card>,
      );

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('transition-all');
      expect(card).toHaveClass('hover:-translate-y-1');
      expect(card).toHaveClass('hover:shadow-lg');
      expect(card).toHaveClass('cursor-pointer');
    });

    it('does not apply hover styles when hover prop is false', () => {
      render(
        <Card hover={false} data-testid="card">
          <p>Content</p>
        </Card>,
      );

      const card = screen.getByTestId('card');
      expect(card).not.toHaveClass('hover:-translate-y-1');
      expect(card).not.toHaveClass('cursor-pointer');
    });

    it('applies glow classes when glow is true', () => {
      render(
        <Card hover glow data-testid="card">
          <p>Content</p>
        </Card>,
      );

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('hover:shadow-primary/10');
      expect(card).toHaveClass('hover:border-primary-500/30');
    });

    it('applies shadow-2xl on hover for elevated variant', () => {
      render(
        <Card hover variant="elevated" data-testid="card">
          <p>Content</p>
        </Card>,
      );

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('hover:shadow-2xl');
    });

    it('respects reduced motion by disabling lift and glow', () => {
      a11yTesting.mockReducedMotion(true);
      render(
        <Card hover glow data-testid="card">
          <p>Content</p>
        </Card>,
      );

      const card = screen.getByTestId('card');
      expect(card).not.toHaveClass('hover:-translate-y-1');
      expect(card).not.toHaveClass('hover:shadow-primary/10');

      // Reset mock for other tests
      a11yTesting.mockReducedMotion(false);
    });
  });

  describe('Full Width', () => {
    it('applies full width class when fullWidth is true', () => {
      render(
        <Card fullWidth data-testid="card">
          <p>Content</p>
        </Card>,
      );

      expect(screen.getByTestId('card')).toHaveClass('w-full');
    });

    it('does not apply full width class by default', () => {
      render(
        <Card data-testid="card">
          <p>Content</p>
        </Card>,
      );

      expect(screen.getByTestId('card')).not.toHaveClass('w-full');
    });
  });

  describe('Custom Classes', () => {
    it('applies custom className', () => {
      render(
        <Card className="custom-class" data-testid="card">
          <p>Content</p>
        </Card>,
      );

      expect(screen.getByTestId('card')).toHaveClass('custom-class');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Card ref={ref} data-testid="card">
          <p>Content</p>
        </Card>,
      );

      expect(ref.current).toBe(screen.getByTestId('card'));
    });
  });
});

describe('CardHeader', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <CardHeader data-testid="header">
          <h3>Header Title</h3>
        </CardHeader>
      </Card>,
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByText('Header Title')).toBeInTheDocument();
  });

  it('has correct styling', () => {
    render(
      <Card>
        <CardHeader data-testid="header">
          <h3>Title</h3>
        </CardHeader>
      </Card>,
    );

    const header = screen.getByTestId('header');
    expect(header).toHaveClass('flex');
    expect(header).toHaveClass('flex-col');
    expect(header).toHaveClass('pb-4');
    expect(header).toHaveClass('border-b');
  });
});

describe('CardTitle', () => {
  it('renders as h3 by default', () => {
    render(
      <Card>
        <CardTitle>Card Title</CardTitle>
      </Card>,
    );

    const title = screen.getByText('Card Title');
    expect(title.tagName).toBe('H3');
  });

  it('has correct styling', () => {
    render(
      <Card>
        <CardTitle data-testid="title">Title</CardTitle>
      </Card>,
    );

    const title = screen.getByTestId('title');
    expect(title).toHaveClass('text-lg');
    expect(title).toHaveClass('font-semibold');
    expect(title).toHaveClass('text-text-primary');
  });
});

describe('CardDescription', () => {
  it('renders with correct styling', () => {
    render(
      <Card>
        <CardDescription data-testid="desc">Description text</CardDescription>
      </Card>,
    );

    const desc = screen.getByTestId('desc');
    expect(desc).toHaveClass('text-sm');
    expect(desc).toHaveClass('text-text-secondary');
    expect(desc.tagName).toBe('P');
  });
});

describe('CardContent', () => {
  it('renders with correct padding', () => {
    render(
      <Card>
        <CardContent data-testid="content">
          <p>Content here</p>
        </CardContent>
      </Card>,
    );

    expect(screen.getByTestId('content')).toHaveClass('pt-4');
  });
});

describe('CardFooter', () => {
  it('renders with correct styling', () => {
    render(
      <Card>
        <CardFooter data-testid="footer">
          <button>Action</button>
        </CardFooter>
      </Card>,
    );

    const footer = screen.getByTestId('footer');
    expect(footer).toHaveClass('flex');
    expect(footer).toHaveClass('items-center');
    expect(footer).toHaveClass('pt-4');
    expect(footer).toHaveClass('mt-4');
    expect(footer).toHaveClass('border-t');
  });
});

describe('CardImage', () => {
  it('renders image with correct src and alt', () => {
    render(
      <Card>
        <CardImage src="/test-image.jpg" alt="Test image" data-testid="image" />
      </Card>,
    );

    const image = screen.getByTestId('image');
    expect(image).toHaveAttribute('src', '/test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test image');
  });

  it('applies aspect ratio classes', () => {
    render(
      <Card>
        <CardImage src="/test.jpg" alt="Test" aspectRatio="video" data-testid="image" />
      </Card>,
    );

    const wrapper = screen.getByTestId('image').parentElement;
    expect(wrapper).toHaveClass('aspect-video');
  });

  it('applies square aspect ratio', () => {
    render(
      <Card>
        <CardImage src="/test.jpg" alt="Test" aspectRatio="square" data-testid="image" />
      </Card>,
    );

    const wrapper = screen.getByTestId('image').parentElement;
    expect(wrapper).toHaveClass('aspect-square');
  });
});

describe('HoverableCard', () => {
  it('renders Card with hover enabled', () => {
    render(
      <HoverableCard data-testid="hoverable-card">
        <p>Content</p>
      </HoverableCard>,
    );

    const card = screen.getByTestId('hoverable-card');
    expect(card).toHaveClass('hover:-translate-y-1');
    expect(card).toHaveClass('cursor-pointer');
  });
});

describe('Card Composition', () => {
  it('renders complete card with all subcomponents', () => {
    render(
      <Card data-testid="card">
        <CardImage src="/header.jpg" alt="Header" aspectRatio="video" />
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Main content goes here</p>
        </CardContent>
        <CardFooter>
          <button>Learn More</button>
        </CardFooter>
      </Card>,
    );

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card description')).toBeInTheDocument();
    expect(screen.getByText('Main content goes here')).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });
});
