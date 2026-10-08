import * as React from 'react';
import { type Variants, motion } from 'motion/react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { TeamMemberCard } from '@/components/ui/TeamMemberCard';
import { PersonSchemaList } from '@/components/seo';
import { teamMembers } from '@/data/team';
import { PRESETS } from '@/config/animation';
import { cn } from '@/utils/cn';

/**
 * Props for the TeamSection component
 */
export interface TeamSectionProps {
  /**
   * The title displayed above the team grid
   * @default "Meet our talented team"
   */
  title?: string;
  /**
   * The subtitle displayed above the team grid
   * @default "We're a team of designers, engineers, and strategists passionate about building the future of work."
   */
  subtitle?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * HTML ID for the section
   * @default "team"
   */
  id?: string;
}

/**
 * TeamSection Component
 *
 * A section displaying team members in a responsive grid.
 * Features:
 * - Leadership members displayed in a prominent row
 * - All other members in a secondary grid
 * - Responsive layout (2 col mobile/tablet, 4 col desktop)
 * - Staggered entrance animations
 * - Theme-aware styling
 */
export const TeamSection: React.FC<TeamSectionProps> = ({
  title = 'Meet our talented team',
  subtitle = "We're a team of designers, engineers, and strategists passionate about building the future of work.",
  className,
  id = 'team',
}) => {
  // Split team members into leadership and other members
  const leadership = teamMembers.filter((m) => m.department === 'leadership');
  const others = teamMembers.filter((m) => m.department !== 'leadership');

  return (
    <Section
      className={cn('bg-bg-primary', className)}
      padding="lg"
      id={id}
      heading={title}
      subheading={subtitle}
      aria-label="Our Team"
    >
      <Container>
        <div className="space-y-16">
          {/* Leadership Grid */}
          {leadership.length > 0 && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-text-primary text-center">Leadership</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center max-w-5xl mx-auto">
                {leadership.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={false}
                    whileInView="animate"
                    viewport={{ once: true, margin: '-50px' }}
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
                    className="will-change-transform"
                  >
                    <TeamMemberCard
                      name={member.name}
                      role={member.role}
                      bio={member.bio}
                      avatar={member.avatar}
                      social={member.social}
                      isLeadership
                      className="h-full"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Other Members Grid */}
          {others.length > 0 && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-text-primary text-center">Team</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {others.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={false}
                    whileInView="animate"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={
                      {
                        initial: PRESETS.fadeInUp?.initial,
                        animate: {
                          ...PRESETS.fadeInUp?.animate,
                          transition: {
                            delay: (index + leadership.length) * 0.05,
                            duration: 0.5,
                          },
                        },
                      } as unknown as Variants
                    }
                    className="will-change-transform"
                  >
                    <TeamMemberCard
                      name={member.name}
                      role={member.role}
                      bio={member.bio}
                      avatar={member.avatar}
                      social={member.social}
                      className="h-full"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SEO Structured Data */}
        <PersonSchemaList members={teamMembers} />
      </Container>
    </Section>
  );
};

TeamSection.displayName = 'TeamSection';

export default TeamSection;
