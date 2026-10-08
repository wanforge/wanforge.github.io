import React from 'react';
import { type BlogAuthor } from '../../data/blog';
import { Card, CardContent } from '../ui/Card';
import { LinkedinIcon, TwitterIcon } from '@/components/icons/BrandIcons';

interface AuthorBioProps {
  author: BlogAuthor;
  className?: string;
}

/**
 * AuthorBio Component
 *
 * Displays information about a blog post author, including their avatar,
 * name, role, bio, and social links.
 */
export const AuthorBio: React.FC<AuthorBioProps> = ({ author, className }) => {
  const { name, role, avatar, bio, social } = author;

  // Get initials for avatar fallback
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card variant="default" className={className ?? ''}>
      <CardContent className="flex flex-col sm:flex-row gap-6 p-6">
        {/* Author Avatar */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-bg-secondary border-2 border-border-default flex items-center justify-center">
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <span className={`${avatar ? 'hidden' : ''} text-2xl font-bold text-text-muted`}>
              {initials}
            </span>
          </div>
        </div>

        {/* Author Info */}
        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
            <div>
              <h3 className="text-xl font-bold text-text-primary leading-tight">{name}</h3>
              <p className="text-sm text-text-secondary">{role}</p>
            </div>

            {/* Social Links */}
            {social && (social.twitter || social.linkedin) && (
              <div className="flex items-center gap-3">
                {social.twitter && (
                  <a
                    href={social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-bg-secondary text-text-secondary hover:text-primary-600 hover:bg-primary-50 transition-colors"
                    aria-label={`${name}'s Twitter`}
                  >
                    <TwitterIcon className="w-4 h-4" />
                  </a>
                )}
                {social.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-bg-secondary text-text-secondary hover:text-primary-600 hover:bg-primary-50 transition-colors"
                    aria-label={`${name}'s LinkedIn`}
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          <p className="text-text-secondary leading-relaxed max-w-2xl">{bio}</p>
        </div>
      </CardContent>
    </Card>
  );
};
