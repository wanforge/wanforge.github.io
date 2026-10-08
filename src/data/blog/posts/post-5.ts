import type { BlogPost } from '../types';
import { blogAuthors } from '../authors';

export const post5: BlogPost = {
  id: '5',
  slug: 'customer-success-framework',
  title: 'The Customer Success Framework That Scaled to 10K Customers',
  excerpt:
    'How we built a customer success operation that maintains a 95% satisfaction score while scaling from 100 to 10,000 customers.',
  category: 'company',
  author: blogAuthors[3]!,
  publishedAt: '2026-01-08',
  readingTime: 7,
  featured: false,
  coverImage: '/images/office-01.jpg',
  tags: ['company', 'customer-success', 'scaling', 'growth'],
  relatedPosts: ['3', '6'],
  content: `
    <p>Scaling a SaaS company is about more than just acquisition; it's about retention. As ModernSaaS grew from 100 to 10,000 customers, we had to completely rethink how we approach customer success.</p>
    
    <h2>1. From Reactive to Proactive</h2>
    <p>In the early days, we waited for users to contact us when they had a problem. Today, we use product usage data to identify when a user is "stuck" and reach out to them before they even realize they need help.</p>
    
    <h2>2. Segmented Support</h2>
    <p>Not all customers have the same needs. We developed a tiered success model:</p>
    <ul>
      <li><strong>Self-Serve:</strong> Comprehensive documentation and AI-powered chat for small teams.</li>
      <li><strong>High-Touch:</strong> Dedicated success managers for our enterprise partners.</li>
      <li><strong>Community:</strong> Peer-to-peer support in our user forums.</li>
    </ul>

    <h2>3. Measuring What Matters</h2>
    <p>We moved away from "time to resolution" as our primary metric and started focusing on **"time to value"**. Our goal is to ensure every new customer achieves their first "win" with ModernSaaS within 24 hours of signing up.</p>

    <blockquote>
      "Success isn't about solving tickets; it's about helping customers achieve their goals. If they succeed, we succeed."
      <cite>— Emily Rodriguez, Head of Marketing</cite>
    </blockquote>

    <h2>The Result</h2>
    <p>This framework has allowed us to maintain a Net Promoter Score (NPS) of 75 and a churn rate well below the industry average.</p>
  `,
};
