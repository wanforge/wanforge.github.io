import * as React from 'react';
import { type Variants, motion } from 'motion/react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { TestimonialCard } from '@/components/ui/TestimonialCard';
import { testimonials } from '@/data';
import { PRESETS } from '@/config/animation';
import { cn } from '@/utils/cn';

/**
 * Props for the TestimonialsSection component
 */
export interface TestimonialsSectionProps {
  /**
   * The title displayed above the testimonials
   * @default "Trusted by teams worldwide"
   */
  title?: string;
  /**
   * The subtitle displayed above the testimonials
   * @default "Don't just take our word for it. Hear from the people who use ModernSaaS every day."
   */
  subtitle?: string;
  /**
   * Additional CSS classes to apply
   */
  className?: string;
  /**
   * HTML ID for the section
   * @default "testimonials"
   */
  id?: string;
}

/**
 * TestimonialsSection Component
 *
 * A section displaying customer testimonials in a responsive grid.
 * Features:
 * - Clear heading and subheading
 * - Responsive grid layout (1 col mobile, 2 col tablet, 3 col desktop)
 * - Staggered entrance animations for cards
 * - Theme-aware styling for light and dark modes
 */
export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  title = 'Trusted by teams worldwide',
  subtitle = "Don't just take our word for it. Hear from the people who use ModernSaaS every day.",
  className,
  id = 'testimonials',
}) => {
  // Use a subset of testimonials for the homepage (e.g., first 6)
  const displayTestimonials = testimonials.slice(0, 6);

  return (
    <Section
      className={cn('bg-bg-secondary/30 dark:bg-bg-secondary/10', className)}
      padding="lg"
      id={id}
      heading={title}
      subheading={subtitle}
      aria-label="Customer Testimonials"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={false}
              whileInView="animate"
              viewport={{ once: true, margin: '-50px' }}
              className="will-change-transform"
              variants={
                {
                  initial: PRESETS.fadeInUp?.initial,
                  animate: {
                    ...PRESETS.fadeInUp?.animate,
                    transition: {
                      delay: index * 0.1,
                      duration: 0.5,
                    },
                  },
                } as unknown as Variants
              }
            >
              <TestimonialCard
                quote={testimonial.quote}
                author={testimonial.author}
                rating={testimonial.rating}
                companyLogo={testimonial.companyLogo}
                className="h-full"
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

TestimonialsSection.displayName = 'TestimonialsSection';

export default TestimonialsSection;
