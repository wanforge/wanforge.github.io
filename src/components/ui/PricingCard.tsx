import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card';
import { Button } from './Button';
import { Badge } from './Badge';
import { Link } from './Link';

/**
 * Pricing Feature Interface
 */
export interface PricingFeature {
  /** Feature description text */
  text: string;
  /** Whether the feature is included in this tier */
  included: boolean;
}

/**
 * PricingCard Props Interface
 */
export interface PricingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Name of the pricing tier (e.g., 'Starter', 'Pro') */
  tier: string;
  /** Brief description of who this tier is for */
  description: string;
  /** Current price for the tier */
  price: string;
  /** Billing period (defaults to '/mo') */
  billingPeriod?: string;
  /** List of features included or excluded */
  features: (string | PricingFeature)[];
  /** Text for the call-to-action button */
  ctaText: string;
  /** Optional URL for the call-to-action link */
  ctaHref?: string;
  /** Whether to use demo link modal for the CTA */
  useDemoModal?: boolean;
  /** Whether to highlight this as the most popular tier */
  isPopular?: boolean;
  /** Callback for CTA button click (if ctaHref is not provided) */
  onCtaClick?: () => void;
  /** Additional CSS classes for the card */
  className?: string;
}

/**
 * PricingCard Component
 *
 * A specialized card component for presenting pricing tiers with a title,
 * description, price, feature list, and call-to-action. Supports highlighting
 * the most popular tier with a badge and visual emphasis.
 *
 * @example
 * ```tsx
 * <PricingCard
 *   tier="Pro"
 *   description="For growing teams and businesses."
 *   price="$49"
 *   features={[
 *     "Unlimited projects",
 *     "Advanced analytics",
 *     "Priority support",
 *     { text: "Custom domains", included: false }
 *   ]}
 *   ctaText="Get Started"
 *   ctaHref="/signup?plan=pro"
 *   isPopular
 * />
 * ```
 */
export const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(
  (
    {
      tier,
      description,
      price,
      billingPeriod = '/mo',
      features,
      ctaText,
      ctaHref,
      useDemoModal = true,
      isPopular = false,
      onCtaClick,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <Card
        ref={ref}
        variant={isPopular ? 'default' : 'outlined'}
        className={cn(
          'flex flex-col h-full transition-all duration-300',
          isPopular &&
            'border-primary-500 ring-1 ring-primary-500 dark:ring-primary-400 shadow-xl shadow-primary-500/10 dark:shadow-primary-400/5',
          className,
        )}
        padding="lg"
        radius="xl"
        data-testid="pricing-card"
        {...props}
      >
        {/* Popular Badge */}
        {isPopular && (
          <div className="absolute top-4 right-4">
            <Badge
              variant="info"
              className="bg-primary-600 text-white border-transparent dark:bg-primary-500 font-bold px-3"
            >
              Most Popular
            </Badge>
          </div>
        )}

        {/* Header */}
        <CardHeader className="border-none pb-2">
          <CardTitle className="text-2xl font-bold">{tier}</CardTitle>
          <CardDescription className="text-base mt-2 min-h-[3rem]">{description}</CardDescription>
        </CardHeader>

        {/* Pricing & Content */}
        <CardContent className="flex-grow pt-4">
          <div className="flex items-baseline mb-8">
            <span className="text-4xl font-extrabold tracking-tight text-text-primary">
              {price}
            </span>
            <span className="ml-1 text-xl font-medium text-text-secondary">{billingPeriod}</span>
          </div>

          <ul className="space-y-4" role="list">
            {features.map((feature, index) => {
              const isString = typeof feature === 'string';
              const text = isString ? feature : feature.text;
              const included = isString ? true : feature.included;

              return (
                <li key={index} className="flex items-start gap-3">
                  <div
                    className={cn(
                      'mt-1 shrink-0 rounded-full p-0.5',
                      included ? 'text-primary-600 dark:text-primary-400' : 'text-text-muted',
                    )}
                  >
                    <Check size={16} strokeWidth={3} aria-hidden="true" />
                  </div>
                  <span className={cn('text-sm', !included && 'text-text-muted line-through')}>
                    {text}
                  </span>
                </li>
              );
            })}
          </ul>
        </CardContent>

        {/* Footer with CTA */}
        <CardFooter className="border-none pt-8">
          {ctaHref ? (
            <Link
              href={ctaHref}
              variant="button"
              useDemoModal={useDemoModal}
              className={cn(
                'w-full py-3 text-center transition-all duration-200',
                !isPopular &&
                  'bg-transparent text-text-primary border border-border-strong hover:bg-bg-secondary dark:hover:bg-bg-secondary',
              )}
            >
              {ctaText}
            </Link>
          ) : (
            <Button
              variant={isPopular ? 'primary' : 'outline'}
              fullWidth
              onClick={onCtaClick}
              className="w-full py-3"
            >
              {ctaText}
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  },
);

PricingCard.displayName = 'PricingCard';

export default PricingCard;
