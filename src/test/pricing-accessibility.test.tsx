import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import * as axeMatchers from 'vitest-axe/matchers';
import { PricingPageContent } from '@/components/pricing/PricingPageContent';
import { ThemeProvider } from '@/components/ThemeProvider';
import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';

expect.extend(axeMatchers);

// Mock Lucide icons to reduce noise
vi.mock('lucide-react', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    Check: () => <span data-testid="check-icon">✓</span>,
    X: () => <span data-testid="x-icon">✗</span>,
    ArrowRight: () => <span>→</span>,
    ShieldCheck: () => <span>🛡️</span>,
    Star: () => <span>⭐</span>,
    HelpCircle: () => <span>❓</span>,
    Plus: () => <span>+</span>,
    Minus: () => <span>-</span>,
    ChevronDown: () => <span>▼</span>,
    Mail: () => <span>✉️</span>,
    Building2: () => <span>🏢</span>,
  };
});

describe('Pricing Page Accessibility', () => {
  const themes = ['light', 'dark'] as const;

  themes.forEach((theme) => {
    describe(`${theme} theme`, () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ThemeProvider defaultTheme={theme}>{children}</ThemeProvider>
      );

      it('PricingPageContent should have no accessibility violations', async () => {
        const { container } = render(<PricingPageContent />, { wrapper });
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });

      it('Comparison table should have accessible headers and roles', () => {
        render(<PricingPageContent />, { wrapper });

        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();

        // Check for table accessibility label
        expect(screen.getByLabelText(/Feature comparison table/i)).toBeInTheDocument();

        // Check for plan headers
        expect(screen.getByRole('columnheader', { name: /Starter/i })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: /Pro/i })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: /Enterprise/i })).toBeInTheDocument();
      });

      it('Pricing cards should have accessible structure', () => {
        render(<PricingPageContent />, { wrapper });

        const cards = screen.getAllByTestId('pricing-card');
        expect(cards.length).toBeGreaterThan(0);

        cards.forEach((card) => {
          // Each card should have a heading
          const heading = card.querySelector('h3');
          expect(heading).toBeInTheDocument();

          // List should have role="list"
          const list = card.querySelector('ul');
          expect(list).toHaveAttribute('role', 'list');
        });
      });
    });
  });

  describe('Keyboard Navigation', () => {
    it('Billing toggle should be keyboard accessible', async () => {
      render(<PricingPageContent />);

      const buttons = screen.getAllByRole('button');
      const monthlyToggle = buttons.find((b) => b.textContent?.includes('Monthly'));
      const annualToggle = buttons.find((b) => b.textContent?.includes('Annual'));

      expect(monthlyToggle).toBeDefined();
      expect(annualToggle).toBeDefined();

      if (monthlyToggle) {
        monthlyToggle.focus();
        expect(document.activeElement).toBe(monthlyToggle);
      }

      if (annualToggle) {
        annualToggle.focus();
        expect(document.activeElement).toBe(annualToggle);
      }
    });

    it('Pricing card CTA buttons should be in tab order', () => {
      render(<PricingPageContent />);
      const ctas = screen.getAllByRole('link', {
        name: /Get Started|Start Free Trial|Contact Sales/i,
      });
      expect(ctas.length).toBeGreaterThan(0);

      const firstCta = ctas[0] as HTMLElement;
      firstCta.focus();
      expect(document.activeElement).toBe(firstCta);
    });
  });
});
