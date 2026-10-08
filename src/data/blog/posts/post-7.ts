import type { BlogPost } from '../types';
import { blogAuthors } from '../authors';

export const post7: BlogPost = {
  id: '7',
  slug: 'new-dashboard-features',
  title: 'New Dashboard Features: Custom Widgets and Advanced Filters',
  excerpt:
    "We've completely revamped the dashboard experience. Learn about custom widgets, advanced filtering, and the new drag-and-drop interface.",
  category: 'product',
  author: blogAuthors[0]!,
  publishedAt: '2025-12-20',
  readingTime: 6,
  featured: false,
  coverImage: '/images/tech-03.jpg',
  tags: ['product', 'features', 'dashboard', 'ui'],
  relatedPosts: ['1', '8'],
  content: `
    <p>Your dashboard is the heartbeat of your workspace. Today, we're making it more powerful and personal than ever before with the release of <strong>Dashboard 2.0</strong>.</p>
    
    <h2>Customizable Widgets</h2>
    <p>Everyone works differently. Now, you can build your own dashboard by dragging and dropping widgets from our new library. Choose from:</p>
    <ul>
      <li><strong>Project Velocity:</strong> Track how fast your team is shipping.</li>
      <li><strong>Upcoming Deadlines:</strong> Never miss a milestone again.</li>
      <li><strong>Resource Allocation:</strong> See who's working on what.</li>
      <li><strong>Custom Metrics:</strong> Connect to your internal APIs to show any data you need.</li>
    </ul>
    
    <h2>Advanced Filtering</h2>
    <p>Searching for data in a sea of projects can be frustrating. Our new filtering engine allows you to create complex queries with multiple conditions, and save them for quick access later.</p>

    <blockquote>
      "The new dashboard has given us a level of visibility we never had before. It's like having a superpower for project management."
      <cite>— Alexandra Chen, CEO</cite>
    </blockquote>

    <h2>Available Today</h2>
    <p>Dashboard 2.0 is rolling out to all customers over the next 48 hours. Head over to your dashboard and look for the "Edit Layout" button to get started!</p>
  `,
};
