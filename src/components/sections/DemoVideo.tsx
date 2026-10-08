/**
 * Demo Video Section
 *
 * A section that showcases the product in action via a video placeholder
 * that triggers the demo modal.
 *
 * @module components/sections
 */

import * as React from 'react';
import { Play } from 'lucide-react';
import { type Variants, motion } from 'motion/react';
import { Container, DemoLink, Section } from '../ui';
import { PRESETS } from '../../config/animation';
import { getAssetPath } from '../../config/paths';

/**
 * Props for the DemoVideo component
 */
export interface DemoVideoProps {
  /**
   * Section id for anchor linking
   * @default 'demo-video'
   */
  id?: string;
  /**
   * Section heading
   * @default 'See it in action'
   */
  heading?: string;
  /**
   * Section subheading
   * @default 'Watch how our platform can transform your workflow in minutes.'
   */
  subheading?: string;
  /**
   * Video thumbnail URL
   * @default 'images/tech-01.jpg'
   */
  thumbnailUrl?: string;
  /**
   * Demo URL to trigger
   * @default '/demo/video'
   */
  demoUrl?: string;
  /**
   * Additional CSS classes to apply
   */
  className?: string;
}

/**
 * DemoVideo Component
 *
 * Displays a high-impact video placeholder with a play button.
 * Clicking the play button triggers the demo modal.
 */
export const DemoVideo: React.FC<DemoVideoProps> = ({
  id = 'demo-video',
  heading = 'See it in action',
  subheading = 'Watch how our platform can transform your workflow in minutes.',
  thumbnailUrl = 'images/tech-01.jpg',
  demoUrl = '/demo/video',
  className = '',
}) => {
  const resolvedThumbnailUrl = getAssetPath(thumbnailUrl);

  return (
    <Section id={id} heading={heading} subheading={subheading} className={className}>
      <Container>
        <motion.div
          variants={PRESETS.fadeInUp as unknown as Variants}
          initial={false}
          whileInView="animate"
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto group will-change-transform"
        >
          <DemoLink
            href={demoUrl}
            forceDemo={true}
            className="block relative aspect-video rounded-2xl overflow-hidden border border-border-default shadow-2xl bg-bg-secondary cursor-pointer"
          >
            {/* Thumbnail Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 flex items-center justify-center">
              <img
                src={resolvedThumbnailUrl}
                alt="Product Demo Video"
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  // Fallback if image fails
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 dark:bg-primary-600/90 text-primary-600 dark:text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 md:w-10 md:h-10 fill-current" />
              </div>
            </div>
          </DemoLink>
        </motion.div>
      </Container>
    </Section>
  );
};

DemoVideo.displayName = 'DemoVideo';

export default DemoVideo;
