import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import * as axeMatchers from 'vitest-axe/matchers';
import * as UI from '@/components/ui';
import * as Sections from '@/components/sections';
import { ThemeProvider } from '@/components/ThemeProvider';
import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';

// Extend expect with a11y matchers
expect.extend(axeMatchers);

// Mock Lucide icons to reduce SVG noise in a11y tests
vi.mock('lucide-react', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    // Provide simple mocks for icons if they cause issues
  };
});

describe('Accessibility', () => {
  const themes = ['light', 'dark'] as const;

  themes.forEach((theme) => {
    describe(`${theme} theme`, () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ThemeProvider defaultTheme={theme}>{children}</ThemeProvider>
      );

      describe('Buttons and Links', () => {
        it('Button should have no accessibility violations', async () => {
          const { container } = render(<UI.Button>Click me</UI.Button>, { wrapper });
          const results = await axe(container);
          expect(results).toHaveNoViolations();
        });

        it('Badge should have no accessibility violations', async () => {
          const { container } = render(<UI.Badge>Status</UI.Badge>, { wrapper });
          const results = await axe(container);
          expect(results).toHaveNoViolations();
        });

        it('Link should have no accessibility violations', async () => {
          const { container } = render(<UI.Link href="/">Home</UI.Link>, { wrapper });
          const results = await axe(container);
          expect(results).toHaveNoViolations();
        });
      });

      describe('Form Components', () => {
        it('Input should have no accessibility violations', async () => {
          const { container } = render(
            <UI.Input label="Email" id="email" helperText="Enter your email" />,
            { wrapper },
          );
          const results = await axe(container);
          expect(results).toHaveNoViolations();
        });

        it('Textarea should have no accessibility violations', async () => {
          const { container } = render(<UI.Textarea label="Message" id="message" />, { wrapper });
          const results = await axe(container);
          expect(results).toHaveNoViolations();
        });

        it('Select should have no accessibility violations', async () => {
          const { container } = render(
            <UI.Select label="Option" id="option">
              <option value="1">Option 1</option>
            </UI.Select>,
            { wrapper },
          );
          const results = await axe(container);
          expect(results).toHaveNoViolations();
        });

        it('NewsletterForm should have no accessibility violations', async () => {
          const { container } = render(<UI.NewsletterForm />, { wrapper });
          const results = await axe(container);
          expect(results).toHaveNoViolations();
        });
      });

      describe('Cards', () => {
        it('Card should have no accessibility violations', async () => {
          const { container } = render(<UI.Card>Card content</UI.Card>, { wrapper });
          const results = await axe(container);
          expect(results).toHaveNoViolations();
        });

        it('GlassmorphicCard should have no accessibility violations', async () => {
          const { container } = render(<UI.GlassmorphicCard>Glass content</UI.GlassmorphicCard>, {
            wrapper,
          });
          const results = await axe(container);
          expect(results).toHaveNoViolations();
        });

        it('FeatureCard should have no accessibility violations', async () => {
          const { container } = render(
            <UI.FeatureCard
              icon={<span aria-hidden="true">🚀</span>}
              title="Feature"
              description="Description"
            />,
            { wrapper },
          );
          const results = await axe(container);
          expect(results).toHaveNoViolations();
        });

        it('PricingCard should have no accessibility violations', async () => {
          const { container } = render(
            <UI.PricingCard
              tier="Basic"
              price="$0"
              description="Free forever"
              features={['Feature 1', 'Feature 2']}
              ctaText="Get Started"
            />,
            { wrapper },
          );
          const results = await axe(container);
          expect(results).toHaveNoViolations();
        });

        it('TestimonialCard should have no accessibility violations', async () => {
          const { container } = render(
            <UI.TestimonialCard
              quote="Great product!"
              author={{
                name: 'John Doe',
                role: 'CEO',
                company: 'Tech Inc',
                avatar: 'https://example.com/avatar.jpg',
              }}
            />,
            { wrapper },
          );
          const results = await axe(container);
          expect(results).toHaveNoViolations();
        });

        it('TeamMemberCard should have no accessibility violations', async () => {
          const { container } = render(
            <UI.TeamMemberCard
              name="Alexandra Chen"
              role="CEO"
              avatar="/images/team-01.jpg"
              social={[{ platform: 'twitter', url: '#' }]}
            />,
            { wrapper },
          );
          const results = await axe(container);
          expect(results).toHaveNoViolations();
        });
      });

      describe('Interactive Components', () => {
        it('Accordion should have no accessibility violations', async () => {
          const { container } = render(
            <UI.Accordion>
              <UI.AccordionItem value="item-1">
                <UI.AccordionTrigger>Question 1</UI.AccordionTrigger>
                <UI.AccordionContent>Answer 1</UI.AccordionContent>
              </UI.AccordionItem>
            </UI.Accordion>,
            { wrapper },
          );
          const results = await axe(container);
          expect(results).toHaveNoViolations();
        });

        it('Tabs should have no accessibility violations', async () => {
          const { container } = render(
            <UI.Tabs defaultValue="tab1">
              <UI.TabsList>
                <UI.TabsTrigger value="tab1">Tab 1</UI.TabsTrigger>
                <UI.TabsTrigger value="tab2">Tab 2</UI.TabsTrigger>
              </UI.TabsList>
              <UI.TabsContent value="tab1">Content 1</UI.TabsContent>
              <UI.TabsContent value="tab2">Content 2</UI.TabsContent>
            </UI.Tabs>,
            { wrapper },
          );
          const results = await axe(container);
          expect(results).toHaveNoViolations();
        });

        it('BillingToggle should have no accessibility violations', async () => {
          const { container } = render(<UI.BillingToggle value="monthly" onChange={() => {}} />, {
            wrapper,
          });
          const results = await axe(container);
          expect(results).toHaveNoViolations();
        });
      });

      describe('Animations and Feedback', () => {
        it('AnimatedCounter should have no accessibility violations', async () => {
          const { container } = render(<UI.AnimatedCounter value={100} />, { wrapper });
          const results = await axe(container);
          expect(results).toHaveNoViolations();
        });

        it('Toast should have no accessibility violations', async () => {
          // Toast usually renders in a portal, so we test the Toaster and a single Toast
          const { container } = render(
            <>
              <UI.Toaster />
              <UI.Toast id="test-toast" message="Test toast" variant="success" onClose={() => {}} />
            </>,
            { wrapper },
          );
          const results = await axe(container);
          expect(results).toHaveNoViolations();
        });

        it('Skeleton should have no accessibility violations', async () => {
          const { container } = render(
            <div role="status" aria-busy="true" aria-label="Loading content">
              <UI.Skeleton />
              <UI.SkeletonText lines={3} />
              <UI.SkeletonAvatar />
              <UI.SkeletonCard />
            </div>,
            { wrapper },
          );
          const results = await axe(container);
          expect(results).toHaveNoViolations();
        });
      });

      describe('Other UI Components', () => {
        it('BentoGrid should have no accessibility violations', async () => {
          const { container } = render(
            <UI.BentoGrid>
              <UI.BentoGridItem title="Item 1" description="Desc 1" />
              <UI.BentoGridItem title="Item 2" description="Desc 2" colSpan={2} />
            </UI.BentoGrid>,
            { wrapper },
          );
          const results = await axe(container);
          expect(results).toHaveNoViolations();
        });

        it('IntegrationLogo should have no accessibility violations', async () => {
          const { container } = render(
            <UI.IntegrationLogo name="Slack" logo="/logos/slack.svg" />,
            {
              wrapper,
            },
          );
          const results = await axe(container);
          expect(results).toHaveNoViolations();
        });

        it('LogoCloud should have no accessibility violations', async () => {
          const { container } = render(
            <UI.LogoCloud logos={[{ name: 'Slack', logo: '/logos/slack.svg' }]} />,
            { wrapper },
          );
          const results = await axe(container);
          expect(results).toHaveNoViolations();
        });

        it('SocialProofBadge should have no accessibility violations', async () => {
          const { container } = render(
            <UI.SocialProofBadge
              variant="rated"
              rating={4.9}
              count="1,000+"
              avatars={['/img1.jpg', '/img2.jpg']}
              animate={false}
            />,
            { wrapper },
          );
          const results = await axe(container);
          expect(results).toHaveNoViolations();
        });

        it('ProductMockup should have no accessibility violations', async () => {
          const { container } = render(
            <UI.ProductMockup src="/images/dashboard-mockup.svg" alt="Dashboard" />,
            { wrapper },
          );
          const results = await axe(container);
          expect(results).toHaveNoViolations();
        });

        it('CodeBlock should have no accessibility violations', async () => {
          const { container } = render(<UI.CodeBlock code="const x = 1;" language="javascript" />, {
            wrapper,
          });
          const results = await axe(container);
          expect(results).toHaveNoViolations();
        });

        it('Container and Section should have no accessibility violations', async () => {
          const { container } = render(
            <UI.Section heading="Section Heading" subheading="Subheading">
              <UI.Container>
                <p>Content</p>
              </UI.Container>
            </UI.Section>,
            { wrapper },
          );
          const results = await axe(container);
          expect(results).toHaveNoViolations();
        });

        it('ThemeToggle should have no accessibility violations', async () => {
          const { container } = render(<UI.ThemeToggle />, { wrapper });
          const results = await axe(container);
          expect(results).toHaveNoViolations();
        });

        describe('Full Sections', () => {
          it('LogoCloudSection should have no accessibility violations', async () => {
            const { container } = render(<Sections.LogoCloudSection />, { wrapper });
            const results = await axe(container);
            expect(results).toHaveNoViolations();
          });

          it('TestimonialsSection should have no accessibility violations', async () => {
            const { container } = render(<Sections.TestimonialsSection />, { wrapper });
            const results = await axe(container);
            expect(results).toHaveNoViolations();
          });

          it('StatsSection should have no accessibility violations', async () => {
            const { container } = render(<Sections.StatsSection />, { wrapper });
            const results = await axe(container);
            expect(results).toHaveNoViolations();
          });

          it('FeaturesOverview should have no accessibility violations', async () => {
            const { container } = render(<Sections.FeaturesOverview />, { wrapper });
            const results = await axe(container);
            expect(results).toHaveNoViolations();
          });

          it('HowItWorks should have no accessibility violations', async () => {
            const { container } = render(<Sections.HowItWorks />, { wrapper });
            const results = await axe(container);
            expect(results).toHaveNoViolations();
          });

          it('IntegrationsSection should have no accessibility violations', async () => {
            const { container } = render(<Sections.IntegrationsSection />, { wrapper });
            const results = await axe(container);
            expect(results).toHaveNoViolations();
          });

          it('PricingPreview should have no accessibility violations', async () => {
            const { container } = render(<Sections.PricingPreview />, { wrapper });
            const results = await axe(container);
            expect(results).toHaveNoViolations();
          });

          it('FAQSection should have no accessibility violations', async () => {
            const { container } = render(<Sections.FAQSection />, { wrapper });
            const results = await axe(container);
            expect(results).toHaveNoViolations();
          });

          it('FinalCTA should have no accessibility violations', async () => {
            const { container } = render(<Sections.FinalCTA />, { wrapper });
            const results = await axe(container);
            expect(results).toHaveNoViolations();
          });

          it('TeamSection should have no accessibility violations', async () => {
            const { container } = render(<Sections.TeamSection />, { wrapper });
            const results = await axe(container);
            expect(results).toHaveNoViolations();
          });
        });
      });
    });
  });
});
