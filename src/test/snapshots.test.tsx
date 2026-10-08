import { render } from '@testing-library/react';
import * as UI from '@/components/ui';
import {
  FAQSection,
  FeaturesOverview,
  FinalCTA,
  Hero,
  HowItWorks,
  IntegrationsSection,
  LogoCloudSection,
  PricingPreview,
  StatsSection,
  TeamSection,
  TestimonialsSection,
} from '@/components/sections';
import { ThemeProvider } from '@/components/ThemeProvider';
import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';

// Mock Lucide icons to ensure stable snapshots (SVGs can sometimes change between versions or environments)
vi.mock('lucide-react', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  const mockedIcons: Record<string, React.FC<Record<string, unknown>>> = {};

  // Mock common icons used in components
  const iconNames = [
    'Check',
    'ChevronDown',
    'ChevronRight',
    'Copy',
    'ExternalLink',
    'Info',
    'AlertTriangle',
    'XCircle',
    'X',
    'Sun',
    'Moon',
    'Menu',
    'Zap',
    'Shield',
    'BarChart',
    'Globe',
    'Layers',
    'Lock',
    'Sparkles',
    'Workflow',
    'Code',
    'Database',
    'Cloud',
    'Smartphone',
    'Users',
    'Plug',
    'Clock',
    'LineChart',
    'Settings',
    'Rocket',
    'ArrowRight',
    'Play',
    'Star',
  ];

  iconNames.forEach((name) => {
    mockedIcons[name] = (props: Record<string, unknown>) => (
      <div data-testid={`icon-${name.toLowerCase()}`} {...props} />
    );
  });

  return {
    ...actual,
    ...mockedIcons,
  };
});

describe('Component Snapshots', () => {
  const themes = ['light', 'dark'] as const;

  themes.forEach((theme) => {
    describe(`${theme} theme`, () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ThemeProvider defaultTheme={theme}>{children}</ThemeProvider>
      );

      describe('Basic Components', () => {
        it('Button matches snapshot', () => {
          const { asFragment } = render(<UI.Button>Click me</UI.Button>, { wrapper });
          expect(asFragment()).toMatchSnapshot();
        });

        it('Button variants match snapshot', () => {
          const { asFragment } = render(
            <div className="space-y-2">
              <UI.Button variant="primary">Primary</UI.Button>
              <UI.Button variant="secondary">Secondary</UI.Button>
              <UI.Button variant="outline">Outline</UI.Button>
              <UI.Button variant="ghost">Ghost</UI.Button>
              <UI.Button size="sm">Small</UI.Button>
              <UI.Button size="lg">Large</UI.Button>
            </div>,
            { wrapper },
          );
          expect(asFragment()).toMatchSnapshot();
        });

        it('Badge matches snapshot', () => {
          const { asFragment } = render(<UI.Badge>Status</UI.Badge>, { wrapper });
          expect(asFragment()).toMatchSnapshot();
        });

        it('Link matches snapshot', () => {
          const { asFragment } = render(<UI.Link href="/">Home</UI.Link>, { wrapper });
          expect(asFragment()).toMatchSnapshot();
        });
      });

      describe('Layout Components', () => {
        it('Container matches snapshot', () => {
          const { asFragment } = render(<UI.Container>Content</UI.Container>, { wrapper });
          expect(asFragment()).toMatchSnapshot();
        });

        it('Section matches snapshot', () => {
          const { asFragment } = render(
            <UI.Section heading="Title" subheading="Subtitle">
              <p>Content</p>
            </UI.Section>,
            { wrapper },
          );
          expect(asFragment()).toMatchSnapshot();
        });

        it('BentoGrid matches snapshot', () => {
          const { asFragment } = render(
            <UI.BentoGrid>
              <UI.BentoGridItem title="Item 1" description="Desc 1" />
              <UI.BentoGridItem title="Item 2" description="Desc 2" colSpan={2} />
            </UI.BentoGrid>,
            { wrapper },
          );
          expect(asFragment()).toMatchSnapshot();
        });
      });

      describe('Cards', () => {
        it('Card matches snapshot', () => {
          const { asFragment } = render(<UI.Card>Card content</UI.Card>, { wrapper });
          expect(asFragment()).toMatchSnapshot();
        });

        it('GlassmorphicCard matches snapshot', () => {
          const { asFragment } = render(<UI.GlassmorphicCard>Glass content</UI.GlassmorphicCard>, {
            wrapper,
          });
          expect(asFragment()).toMatchSnapshot();
        });

        it('FeatureCard matches snapshot', () => {
          const { asFragment } = render(
            <UI.FeatureCard icon={<span>🚀</span>} title="Feature" description="Description" />,
            { wrapper },
          );
          expect(asFragment()).toMatchSnapshot();
        });

        it('PricingCard matches snapshot', () => {
          const { asFragment } = render(
            <UI.PricingCard
              tier="Pro"
              price="$29"
              description="Best for teams"
              features={['Feature 1', 'Feature 2']}
              ctaText="Get Started"
              isPopular
            />,
            { wrapper },
          );
          expect(asFragment()).toMatchSnapshot();
        });

        it('TestimonialCard matches snapshot', () => {
          const { asFragment } = render(
            <UI.TestimonialCard
              quote="Excellent template!"
              author={{
                name: 'Jane Smith',
                role: 'Designer',
                company: 'Creative Co',
                avatar: '/avatars/jane.jpg',
              }}
            />,
            { wrapper },
          );
          expect(asFragment()).toMatchSnapshot();
        });

        it('TeamMemberCard matches snapshot', () => {
          const { asFragment } = render(
            <UI.TeamMemberCard
              name="Alexandra Chen"
              role="CEO"
              avatar="/images/team-01.jpg"
              social={[{ platform: 'twitter', url: '#' }]}
            />,
            { wrapper },
          );
          expect(asFragment()).toMatchSnapshot();
        });
      });

      describe('Form Components', () => {
        it('Input matches snapshot', () => {
          const { asFragment } = render(
            <UI.Input label="Username" id="user" placeholder="Enter username" />,
            { wrapper },
          );
          expect(asFragment()).toMatchSnapshot();
        });

        it('Input states match snapshot', () => {
          const { asFragment } = render(
            <div className="space-y-4">
              <UI.Input label="Default" id="default" />
              <UI.Input label="Error" id="error" error="This field is required" />
              <UI.Input label="Helper" id="helper" helperText="Minimal 8 characters" />
            </div>,
            { wrapper },
          );
          expect(asFragment()).toMatchSnapshot();
        });

        it('Textarea matches snapshot', () => {
          const { asFragment } = render(
            <UI.Textarea label="Bio" id="bio" showCharacterCount maxLength={100} />,
            { wrapper },
          );
          expect(asFragment()).toMatchSnapshot();
        });

        it('Select matches snapshot', () => {
          const { asFragment } = render(
            <UI.Select label="Theme" id="theme-select">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </UI.Select>,
            { wrapper },
          );
          expect(asFragment()).toMatchSnapshot();
        });

        it('NewsletterForm matches snapshot', () => {
          const { asFragment } = render(<UI.NewsletterForm />, { wrapper });
          expect(asFragment()).toMatchSnapshot();
        });
      });

      describe('Interactive Components', () => {
        it('Accordion matches snapshot', () => {
          const { asFragment } = render(
            <UI.Accordion type="single" defaultValue="item-1">
              <UI.AccordionItem value="item-1">
                <UI.AccordionTrigger>Is it responsive?</UI.AccordionTrigger>
                <UI.AccordionContent>Yes, it is fully responsive.</UI.AccordionContent>
              </UI.AccordionItem>
            </UI.Accordion>,
            { wrapper },
          );
          expect(asFragment()).toMatchSnapshot();
        });

        it('Tabs matches snapshot', () => {
          const { asFragment } = render(
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
          expect(asFragment()).toMatchSnapshot();
        });

        it('BillingToggle matches snapshot', () => {
          const { asFragment } = render(<UI.BillingToggle value="annual" onChange={() => {}} />, {
            wrapper,
          });
          expect(asFragment()).toMatchSnapshot();
        });

        it('AnimatedCounter matches snapshot', () => {
          const { asFragment } = render(<UI.AnimatedCounter value={99.9} suffix="%" />, {
            wrapper,
          });
          expect(asFragment()).toMatchSnapshot();
        });

        it('Toast matches snapshot', () => {
          const { asFragment } = render(
            <UI.Toast id="msg" message="Saved successfully" variant="success" onClose={() => {}} />,
            { wrapper },
          );
          expect(asFragment()).toMatchSnapshot();
        });
      });

      describe('Specialized Components', () => {
        it('CodeBlock matches snapshot', () => {
          const { asFragment } = render(
            <UI.CodeBlock code="echo 'hello world'" language="bash" />,
            {
              wrapper,
            },
          );
          expect(asFragment()).toMatchSnapshot();
        });

        it('Skeleton variants match snapshot', () => {
          const { asFragment } = render(
            <div className="space-y-4">
              <UI.Skeleton className="h-4 w-20" />
              <UI.SkeletonText lines={2} />
              <UI.SkeletonAvatar size="lg" />
              <UI.SkeletonCard />
            </div>,
            { wrapper },
          );
          expect(asFragment()).toMatchSnapshot();
        });

        it('LogoCloud matches snapshot', () => {
          const { asFragment } = render(
            <UI.LogoCloud
              logos={[{ name: 'Vercel', logo: '/logos/vercel.svg' }]}
              title="Our Partners"
            />,
            { wrapper },
          );
          expect(asFragment()).toMatchSnapshot();
        });

        it('IntegrationLogo matches snapshot', () => {
          const { asFragment } = render(
            <UI.IntegrationLogo name="Figma" logo="/logos/figma.svg" size="lg" />,
            { wrapper },
          );
          expect(asFragment()).toMatchSnapshot();
        });

        it('ProductMockup matches snapshot', () => {
          const { asFragment } = render(
            <div className="space-y-8">
              <UI.ProductMockup
                src="/images/dashboard-mockup.svg"
                variant="laptop"
                alt="Laptop Dashboard"
              />
              <UI.ProductMockup
                src="/images/dashboard-mockup.svg"
                variant="phone"
                alt="Phone Dashboard"
              />
            </div>,
            { wrapper },
          );
          expect(asFragment()).toMatchSnapshot();
        });
      });

      describe('Theme & Utils', () => {
        it('ThemeToggle matches snapshot', () => {
          const { asFragment } = render(<UI.ThemeToggle />, { wrapper });
          expect(asFragment()).toMatchSnapshot();
        });

        it('DemoLink matches snapshot', () => {
          const { asFragment } = render(<UI.DemoLink href="/demo">Try Demo</UI.DemoLink>, {
            wrapper,
          });
          expect(asFragment()).toMatchSnapshot();
        });

        it('GradientBackground matches snapshot', () => {
          const { asFragment } = render(
            <UI.GradientBackground variant="deep" id="test-gradient" />,
            { wrapper },
          );
          expect(asFragment()).toMatchSnapshot();
        });
      });

      describe('Sections', () => {
        it('Hero section matches snapshot', () => {
          const { asFragment } = render(<Hero />, { wrapper });
          expect(asFragment()).toMatchSnapshot();
        });

        it('LogoCloudSection matches snapshot', () => {
          const { asFragment } = render(<LogoCloudSection />, { wrapper });
          expect(asFragment()).toMatchSnapshot();
        });

        it('TestimonialsSection matches snapshot', () => {
          const { asFragment } = render(<TestimonialsSection />, { wrapper });
          expect(asFragment()).toMatchSnapshot();
        });

        it('StatsSection matches snapshot', () => {
          const { asFragment } = render(<StatsSection />, { wrapper });
          expect(asFragment()).toMatchSnapshot();
        });

        it('FeaturesOverview section matches snapshot', () => {
          const { asFragment } = render(<FeaturesOverview />, { wrapper });
          expect(asFragment()).toMatchSnapshot();
        });

        it('HowItWorks section matches snapshot', () => {
          const { asFragment } = render(<HowItWorks />, { wrapper });
          expect(asFragment()).toMatchSnapshot();
        });

        it('IntegrationsSection matches snapshot', () => {
          const { asFragment } = render(<IntegrationsSection />, { wrapper });
          expect(asFragment()).toMatchSnapshot();
        });

        it('PricingPreview matches snapshot', () => {
          const { asFragment } = render(<PricingPreview />, { wrapper });
          expect(asFragment()).toMatchSnapshot();
        });

        it('FAQSection matches snapshot', () => {
          const { asFragment } = render(<FAQSection />, { wrapper });
          expect(asFragment()).toMatchSnapshot();
        });

        it('FinalCTA matches snapshot', () => {
          const { asFragment } = render(<FinalCTA />, { wrapper });
          expect(asFragment()).toMatchSnapshot();
        });

        it('TeamSection matches snapshot', () => {
          const { asFragment } = render(<TeamSection />, { wrapper });
          expect(asFragment()).toMatchSnapshot();
        });
      });
    });
  });
});
