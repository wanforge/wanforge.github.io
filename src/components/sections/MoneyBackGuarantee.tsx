import * as React from 'react';
import { type Variants, motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { moneyBackGuarantee } from '@/data/pricing';
import { PRESETS } from '@/config/animation';
import { cn } from '@/utils/cn';

/**
 * MoneyBackGuarantee Section Component
 *
 * A high-trust callout highlighting the satisfaction guarantee.
 * Usually placed near pricing or final CTA to reduce risk perception.
 */
export const MoneyBackGuarantee: React.FC<{ className?: string }> = ({ className }) => {
  const { title, description } = moneyBackGuarantee;

  return (
    <Section
      id="guarantee"
      className={cn('py-12 lg:py-16', className)}
      background="muted"
      aria-label="Satisfaction Guarantee"
    >
      <Container>
        <motion.div
          initial={false}
          whileInView="animate"
          viewport={{ once: true }}
          variants={PRESETS.fadeInUp as unknown as Variants}
          className="flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-6 md:gap-10 max-w-4xl mx-auto p-8 rounded-3xl bg-bg-primary border border-border-default shadow-sm will-change-transform"
        >
          <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center">
            <ShieldCheck className="w-10 h-10 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">{title}</h2>
            <p className="text-text-muted text-lg leading-relaxed">{description}</p>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};

export default MoneyBackGuarantee;
