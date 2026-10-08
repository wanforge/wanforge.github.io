import * as React from 'react';
import { Link as LinkIcon } from 'lucide-react';
import { FacebookIcon, LinkedinIcon, TwitterIcon } from '@/components/icons/BrandIcons';
import { DemoLink } from './DemoLink';
import { IconButton } from './Button';
import { toast } from './Toast';
import { cn } from '@/utils/cn';

/**
 * Props for the SocialShare component
 */
export interface SocialShareProps {
  /** The URL to share (defaults to current window URL) */
  url?: string;
  /** The title of the content being shared */
  title?: string;
  /** Additional CSS classes */
  className?: string;
  /** Layout orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Show labels next to icons */
  showLabels?: boolean;
}

/**
 * SocialShare Component
 *
 * Provides social sharing buttons for blog posts and other content.
 * Features:
 * - Share to Twitter, LinkedIn, Facebook (triggers demo modal)
 * - Copy to clipboard functionality with toast feedback
 * - Responsive layout support (horizontal/vertical)
 * - Theme-aware styling
 */
export const SocialShare: React.FC<SocialShareProps> = ({
  url,
  title = '',
  className = '',
  orientation = 'horizontal',
  showLabels = false,
}) => {
  const [currentUrl, setCurrentUrl] = React.useState<string>('');

  React.useEffect(() => {
    // Get current URL if not provided (browser only)
    if (url) {
      setCurrentUrl(url);
    } else if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, [url]);

  const handleCopyLink = async () => {
    if (!currentUrl) return;

    try {
      await navigator.clipboard.writeText(currentUrl);
      toast.success('Link copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy link');
      console.error('Failed to copy link: ', err);
    }
  };

  const shareLinks = [
    {
      name: 'Twitter',
      icon: TwitterIcon,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`,
      color: 'hover:text-[#1DA1F2] dark:hover:text-[#1DA1F2]',
      label: 'Share on Twitter',
    },
    {
      name: 'LinkedIn',
      icon: LinkedinIcon,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      color: 'hover:text-[#0A66C2] dark:hover:text-[#0A66C2]',
      label: 'Share on LinkedIn',
    },
    {
      name: 'Facebook',
      icon: FacebookIcon,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      color: 'hover:text-[#1877F2] dark:hover:text-[#1877F2]',
      label: 'Share on Facebook',
    },
  ];

  return (
    <div
      className={cn(
        'flex gap-2',
        orientation === 'vertical' ? 'flex-col items-center' : 'flex-row items-center',
        className,
      )}
      aria-label="Social share"
    >
      {shareLinks.map((share) => (
        <DemoLink
          key={share.name}
          href={share.href}
          className={cn(
            'flex items-center gap-2 rounded-lg p-2 text-text-secondary transition-colors hover:bg-bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
            share.color,
          )}
          title={share.label}
          aria-label={share.label}
          forceDemo={true}
        >
          <share.icon size={20} aria-hidden="true" />
          {showLabels && <span className="text-sm font-medium">{share.name}</span>}
        </DemoLink>
      ))}

      <div className="h-4 w-px bg-border-default mx-1 hidden sm:block" />

      <IconButton
        icon={<LinkIcon size={20} />}
        aria-label="Copy link to clipboard"
        variant="ghost"
        size="md"
        onClick={handleCopyLink}
        className="text-text-secondary hover:text-text-primary"
        title="Copy link"
      />
    </div>
  );
};

export default SocialShare;
