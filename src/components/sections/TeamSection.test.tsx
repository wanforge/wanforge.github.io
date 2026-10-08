/**
 * @vitest-environment jsdom
 */
import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { TeamSection } from './TeamSection';
import { teamMembers } from '@/data/team';
import { renderWithTheme } from '@/test/utils';

describe('TeamSection', () => {
  it('renders the team section with heading and subheading', () => {
    renderWithTheme(<TeamSection title="Meet the Team" subtitle="Our amazing people" />);

    expect(screen.getByText(/meet the team/i)).toBeInTheDocument();
    expect(screen.getByText(/our amazing people/i)).toBeInTheDocument();
  });

  it('renders leadership and team subheadings', () => {
    renderWithTheme(<TeamSection />);

    expect(screen.getByRole('heading', { name: /leadership/i })).toBeInTheDocument();
    // Use exact match to distinguish from "Meet our talented team"
    expect(screen.getByRole('heading', { name: /^team$/i })).toBeInTheDocument();
  });

  it('renders all team members from data', () => {
    renderWithTheme(<TeamSection />);

    teamMembers.forEach((member) => {
      // Use queryAllByText because names might appear in alt text or other places
      const elements = screen.getAllByText(member.name);
      expect(elements.length).toBeGreaterThan(0);

      expect(screen.getByText(member.role)).toBeInTheDocument();
    });
  });

  it('renders social links for members', () => {
    renderWithTheme(<TeamSection />);

    // Check for some social labels (from our TeamMemberCard implementation)
    const alexMember = teamMembers.find((m) => m.name === 'Alexandra Chen')!;
    alexMember.social.forEach((link) => {
      expect(
        screen.getByLabelText(new RegExp(`alexandra chen's ${link.platform}`, 'i')),
      ).toBeInTheDocument();
    });
  });

  it('has correct accessibility attributes', () => {
    renderWithTheme(<TeamSection />);
    // Section component uses aria-label="Our Team"
    expect(screen.getByLabelText(/our team/i)).toBeInTheDocument();
  });
});
