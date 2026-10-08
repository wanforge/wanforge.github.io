import React from 'react';
import { Section } from '../ui/Section';
import { Container } from '../ui/Container';
import { motion } from 'motion/react';
import { FileText, Shield } from 'lucide-react';

export interface LegalHeroProps {
  title: string;
  lastUpdated: string;
}

export const LegalHero: React.FC<LegalHeroProps> = ({ title, lastUpdated }) => {
  // Determine icon based on title
  const isPrivacy = title.toLowerCase().includes('privacy');
  const IconComponent = isPrivacy ? Shield : FileText;

  return (
    <Section
      background="primary"
      padding="lg"
      className="overflow-hidden relative border-b border-border-muted"
    >
      {/* Background patterns - optimized */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/10 rounded-full opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary-500/10 rounded-full opacity-60" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Page type badge with icon */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6"
          >
            <IconComponent className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              {isPrivacy ? 'Legal Document' : 'Legal Agreement'}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 dark:from-primary-400 dark:via-primary-300 dark:to-secondary-400 bg-clip-text text-transparent"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-text-secondary"
          >
            Last Updated: {lastUpdated}
          </motion.p>
        </div>
      </Container>
    </Section>
  );
};
