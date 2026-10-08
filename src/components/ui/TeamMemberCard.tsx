import * as React from 'react';
import { Globe } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/icons/BrandIcons';
import { cn } from '@/utils/cn';
import { Card, CardContent } from './Card';
import { DemoLink } from './DemoLink';
import { LazyImage } from './LazyImage';

/**
 * TeamMemberCard Props Interface
 */
export interface TeamMemberCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The team member's name */
  name: string;
  /** The team member's role or title */
  role: string;
  /** Optional biography text */
  bio?: string | undefined;
  /** URL for the member's photo/avatar */
  avatar: string;
  /** Social media links */
  social?:
    | Array<{
        platform: 'twitter' | 'linkedin' | 'github' | 'website';
        url: string;
      }>
    | undefined;
  /** Whether this is a leadership role (affects styling) */
  isLeadership?: boolean | undefined;
  /** Additional CSS classes */
  className?: string | undefined;
}

/**
 * Icon mapping for social platforms
 */
const platformIcons = {
  twitter: TwitterIcon,
  linkedin: LinkedinIcon,
  github: GithubIcon,
  website: Globe,
};

/**
 * TeamMemberCard Component
 *
 * A card component designed to display team member information including
 * their photo, name, role, bio, and social media links.
 */
export const TeamMemberCard = React.forwardRef<HTMLDivElement, TeamMemberCardProps>(
  ({ name, role, bio, avatar, social = [], isLeadership = false, className, ...props }, ref) => {
    // Generate initials for avatar fallback
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    return (
      <Card
        ref={ref}
        variant="default"
        padding="none"
        radius="xl"
        className={cn(
          'group flex flex-col items-center text-center overflow-hidden transition-all duration-300',
          'bg-bg-primary border-border-default hover:border-primary-500/30 hover:shadow-xl hover:-translate-y-1',
          isLeadership && 'ring-2 ring-primary-500/10 shadow-lg',
          className,
        )}
        {...props}
      >
        <CardContent className="p-8 flex flex-col items-center">
          {/* Member Photo */}
          <div
            className={cn(
              'relative mb-6 rounded-full overflow-hidden border-4 border-bg-primary shadow-inner bg-bg-secondary',
              'transition-transform duration-500 group-hover:scale-105',
              isLeadership ? 'w-48 h-48 md:w-56 md:h-56' : 'w-40 h-40 md:w-48 md:h-48',
            )}
          >
            <LazyImage
              src={avatar}
              alt={name}
              containerClassName="w-full h-full"
              className="w-full h-full object-cover"
              loading="lazy"
              placeholder={
                <div className="absolute inset-0 flex items-center justify-center text-primary-600 font-bold text-4xl select-none">
                  {initials}
                </div>
              }
              onError={(e) => {
                // Fallback to initials if image fails to load
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>

          {/* Member Info */}
          <div className="space-y-1 mb-4">
            <h4
              className={cn(
                'text-text-primary font-bold leading-tight',
                isLeadership ? 'text-2xl' : 'text-xl',
              )}
            >
              {name}
            </h4>
            <p className="text-primary-600 dark:text-primary-400 font-medium text-sm md:text-base">
              {role}
            </p>
          </div>

          {/* Optional Bio */}
          {bio && <p className="text-text-muted text-sm leading-relaxed mb-6 max-w-xs">{bio}</p>}

          {/* Social Links */}
          {social.length > 0 && (
            <div className="flex items-center justify-center gap-3">
              {social.map((link) => {
                const Icon = platformIcons[link.platform];
                return (
                  <DemoLink
                    key={link.platform}
                    href={link.url}
                    className={cn(
                      'p-2 rounded-full transition-colors duration-200',
                      'text-text-muted hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20',
                    )}
                    aria-label={`${name}'s ${link.platform}`}
                  >
                    <Icon size={20} />
                  </DemoLink>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    );
  },
);

TeamMemberCard.displayName = 'TeamMemberCard';
