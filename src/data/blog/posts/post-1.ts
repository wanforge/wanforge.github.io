import type { BlogPost } from '../types';
import { blogAuthors } from '../authors';

export const post1: BlogPost = {
  id: '1',
  slug: 'introducing-modern-saas-2-0',
  title: 'Introducing ModernSaaS 2.0: The Future of Team Collaboration',
  excerpt:
    "We're excited to announce the biggest update in our history. ModernSaaS 2.0 brings AI-powered features, real-time collaboration, and a completely redesigned interface.",
  category: 'announcements',
  author: blogAuthors[0]!,
  publishedAt: '2026-02-01',
  readingTime: 5,
  featured: true,
  coverImage: '/images/tech-01.jpg',
  tags: ['product', 'announcement', 'AI', 'collaboration'],
  relatedPosts: ['2', '3'],
  content: `
    <p>Today marks a major milestone for ModernSaaS. After months of hard work and thousands of hours of development, we're finally ready to share <strong>ModernSaaS 2.0</strong> with the world.</p>
    
    <p>When we first launched, our goal was simple: help teams work better together. But as the world of work evolved, we realized that simple collaboration wasn't enough anymore. Teams need more than just a place to talk; they need intelligent systems that anticipate their needs, automate their repetitive tasks, and provide deep insights into their projects.</p>
    
    <h2>What's New in 2.0?</h2>
    
    <p>ModernSaaS 2.0 isn't just a UI update. We've rebuilt the core engine from the ground up to support a new generation of features:</p>
    
    <ul>
      <li><strong>AI-Powered Task Automation:</strong> Our new AI agent can automatically categorize tasks, assign them to the right team members, and even suggest deadlines based on past performance.</li>
      <li><strong>Real-time Multiplayer Collaboration:</strong> Experience seamless, sub-50ms latency when working on documents and project boards with your team.</li>
      <li><strong>Advanced Analytics Dashboard:</strong> Get a bird's-eye view of your team's productivity with customizable widgets and deep-drill reports.</li>
      <li><strong>Dark Mode & Theme Support:</strong> A complete visual overhaul with full dark mode support and customizable theme tokens.</li>
    </ul>
    
    <h2>The Future is Intelligent</h2>
    
    <p>We believe that the next decade of SaaS will be defined by how well products can augment human capability. With ModernSaaS 2.0, we're taking our first step toward that future.</p>
    
    <blockquote>
      "ModernSaaS 2.0 is the tool we've been waiting for. It has transformed how our engineering team operates and saved us countless hours of manual project management."
      <cite>— Sarah Mitchell, Lead Engineer</cite>
    </blockquote>
    
    <p>We can't wait to see what you build with it. Start your free trial today and experience the future of work.</p>
  `,
};
