import React from 'react';
import type { TeamMember } from '../../data/team';
import site from '../../config/site';
import { getAssetPath, getPathConfig } from '../../config/paths';

/**
 * Props for the PersonSchema component
 */
export interface PersonSchemaProps {
  /** The team member data */
  member: TeamMember;
}

/**
 * PersonSchema Component
 *
 * Renders JSON-LD Person schema for search engines.
 * This helps search engines index individual team members and their roles.
 *
 * @see https://schema.org/Person
 */
export const PersonSchema: React.FC<PersonSchemaProps> = ({ member }) => {
  const { company } = site;
  const { siteUrl } = getPathConfig();

  // Map social links to sameAs array
  const sameAs = member.social.map((s) => s.url).filter(Boolean);

  const schema = {
    '@context': 'https://schema.org' as const,
    '@type': 'Person' as const,
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
    image: member.avatar.startsWith('http')
      ? member.avatar
      : `${siteUrl}${getAssetPath(member.avatar)}`,
    sameAs,
    worksFor: {
      '@type': 'Organization' as const,
      name: company.name,
    },
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/**
 * Props for the PersonSchemaList component
 */
export interface PersonSchemaListProps {
  /** Array of team members */
  members: TeamMember[];
}

/**
 * PersonSchemaList Component
 *
 * Renders multiple JSON-LD Person schemas as individual scripts.
 */
export const PersonSchemaList: React.FC<PersonSchemaListProps> = ({ members }) => {
  return (
    <>
      {members.map((member) => (
        <PersonSchema key={member.id} member={member} />
      ))}
    </>
  );
};

export default PersonSchema;
