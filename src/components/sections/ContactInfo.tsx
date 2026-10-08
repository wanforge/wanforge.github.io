import * as React from 'react';
import { type Variants, motion } from 'motion/react';
import { Mail, MapPin, MessageSquare, Phone } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/icons/BrandIcons';
import { Card, CardContent, Container, DemoLink, Section } from '@/components/ui';
import { PRESETS } from '@/config/animation';
import { cn } from '@/utils/cn';
import { site } from '@/config/site';

/**
 * Props for the ContactInfo component
 */
export interface ContactInfoProps {
  /** Additional CSS classes */
  className?: string;
  /** HTML ID for the section */
  id?: string;
}

/**
 * ContactInfo Section Component
 *
 * Displays alternative contact methods including email, phone, social links,
 * and office location. Integrates with demo modal for placeholder links.
 */
export const ContactInfo: React.FC<ContactInfoProps> = ({ className, id = 'contact-info' }) => {
  const contactMethods = [
    {
      title: 'Email Us',
      description: 'Our team is here to help with any questions.',
      value: site.contact.email,
      href: `mailto:${site.contact.email}`,
      icon: Mail,
      category: 'Support',
    },
    {
      title: 'Sales Inquiries',
      description: 'Talk to our sales team about enterprise solutions.',
      value: site.contact.salesEmail,
      href: `mailto:${site.contact.salesEmail}`,
      icon: MessageSquare,
      category: 'Sales',
    },
    {
      title: 'Phone',
      description: 'Available Mon-Fri, 9am-6pm PST.',
      value: site.contact.phone,
      href: `tel:${site.contact.phone.replace(/\s/g, '')}`,
      icon: Phone,
      category: 'General',
    },
    {
      title: 'Office',
      description: 'Visit our headquarters in San Francisco.',
      value: `${site.contact.address.street}, ${site.contact.address.city}, ${site.contact.address.state} ${site.contact.address.zip}`,
      href: '#',
      icon: MapPin,
      category: 'Location',
    },
  ];

  const socialLinks = [
    {
      name: 'Twitter',
      icon: TwitterIcon,
      href: site.social.twitterUrl,
      label: 'Follow us on Twitter',
    },
    { name: 'GitHub', icon: GithubIcon, href: site.social.githubUrl, label: 'Star us on GitHub' },
    {
      name: 'LinkedIn',
      icon: LinkedinIcon,
      href: site.social.linkedinUrl,
      label: 'Connect on LinkedIn',
    },
  ];

  return (
    <Section id={id} className={cn('bg-bg-primary', className)} padding="lg">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Header Content */}
          <motion.div
            initial={false}
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={PRESETS.fadeInUp as unknown as Variants}
            className="will-change-transform lg:col-span-1 text-center lg:text-left"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Other ways to connect
            </h2>
            <p className="mb-8 text-lg text-text-secondary leading-relaxed max-w-lg mx-auto lg:max-w-none lg:mx-0">
              Prefer a direct line? Reach out through any of these channels and we'll get back to
              you as soon as possible.
            </p>

            <div className="flex flex-col gap-6 items-center lg:items-start">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
                Follow our journey
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <DemoLink
                    key={social.name}
                    href={social.href}
                    forceDemo
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-bg-secondary text-text-secondary transition-all hover:bg-brand-primary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
                    aria-label={social.label}
                  >
                    <social.icon size={22} />
                  </DemoLink>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Methods Grid */}
          <motion.div
            initial={false}
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={PRESETS.stagger as unknown as Variants}
            className="will-change-transform grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2"
          >
            {contactMethods.map((method) => (
              <motion.div key={method.title} variants={PRESETS.fadeInUp as unknown as Variants}>
                <DemoLink href={method.href} forceDemo className="group block h-full">
                  <Card className="h-full border-border-default bg-bg-primary transition-all group-hover:border-brand-primary/50 group-hover:shadow-md">
                    <CardContent className="flex gap-4 p-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-white">
                        <method.icon size={24} />
                      </div>
                      <div className="flex flex-col">
                        <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand-primary">
                          {method.category}
                        </span>
                        <h3 className="mb-1 text-lg font-bold text-text-primary">{method.title}</h3>
                        <p className="mb-3 text-sm text-text-secondary leading-relaxed">
                          {method.description}
                        </p>
                        <span className="text-sm font-medium text-text-primary group-hover:text-brand-primary transition-colors">
                          {method.value}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </DemoLink>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

ContactInfo.displayName = 'ContactInfo';

export default ContactInfo;
