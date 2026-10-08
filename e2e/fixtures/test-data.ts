/**
 * E2E Test Fixtures
 *
 * Mock data and constants for end-to-end testing.
 */

export const testRoutes = {
  home: '',
  features: 'features/',
  pricing: 'pricing/',
  about: 'about/',
  blog: 'blog/',
  contact: 'contact/',
  support: 'support/',
  changelog: 'changelog/',
  roadmap: 'roadmap/',
  privacy: 'privacy/',
  terms: 'terms/',
  signup: 'signup/',
  login: 'login/',
  dashboard: 'dashboard/',
  settings: 'settings/',
} as const;

export const selectors = {
  navigation: {
    header: 'header[role="banner"]',
    logo: '[data-testid="logo"]',
    navLinks: 'nav a',
    themeToggle: '[data-testid="theme-toggle"]',
    mobileMenuButton: '[data-testid="mobile-menu-button"]',
    mobileMenu: '[data-testid="mobile-menu"]',
  },
  hero: {
    section: '[data-testid="hero-section"]',
    headline: '[data-testid="hero-headline"]',
    description: '[data-testid="hero-description"]',
    primaryCta: '[data-testid="hero-cta-primary"]',
    secondaryCta: '[data-testid="hero-cta-secondary"]',
  },
  footer: {
    section: 'footer',
    links: 'footer a',
    socialLinks: '[data-testid="social-link"]',
    copyright: '[data-testid="copyright"]',
  },
  modal: {
    overlay: '[data-testid="modal-overlay"]',
    content: '[data-testid="modal-content"]',
    closeButton: '[data-testid="modal-close"]',
    demoMessage: '[data-testid="demo-message"]',
  },
  features: {
    section: '[data-testid="features-section"]',
    cards: '[data-testid="feature-card"]',
  },
  pricing: {
    section: '[data-testid="pricing-section"]',
    tiers: '[data-testid="pricing-card"]',
    billingToggle: '[data-testid="billing-toggle"]',
  },
  blog: {
    listing: '[data-testid="blog-listing"]',
    hero: '[data-testid="blog-hero"]',
    featuredPost: '[data-testid="featured-post"]',
    postCard: '[data-testid="blog-post-card"]',
    categoryFilter: '[data-testid="category-filter"]',
    categoryTrigger: '[role="tab"]',
    search: '[data-testid="blog-search"]',
    pagination: '[data-testid="pagination"]',
    relatedPosts: '[data-testid="related-posts"]',
    postHeader: '[data-testid="blog-post-header"]',
    postContent: '[data-testid="blog-post-content"]',
  },
  forms: {
    contact: '[data-testid="contact-form"]',
    contactSubmit: '[data-testid="contact-submit"]',
    newsletter: '[data-testid="newsletter-form"]',
    newsletterSubmit: '[data-testid="newsletter-submit"]',
    login: '[data-testid="login-form"]',
    loginSubmit: '[data-testid="login-submit"]',
    signup: '[data-testid="signup-form"]',
    signupSubmit: '[data-testid="signup-submit"]',
    emailInput: 'input[type="email"]',
    nameInput: 'input[name="name"], input[id="name"]',
    messageInput: 'textarea[name="message"], textarea[id="message"]',
    submitButton: 'button[type="submit"]',
    error: '[data-testid="input-error"]',
    githubAuth: '[data-testid="github-auth"]',
    googleAuth: '[data-testid="google-auth"]',
  },
  integrations: {
    logo: '[data-testid="integration-logo"]',
  },
} as const;

export const expectedContent = {
  siteName: 'ModernSaaS',
  meta: {
    description: /ModernSaaS|landing page|template/i,
    ogType: 'website',
  },
  navigation: {
    items: ['Features', 'Pricing', 'About', 'Blog', 'Contact'],
  },
  footer: {
    columns: ['Product', 'Company', 'Resources', 'Legal'],
  },
} as const;

export const timeouts = {
  short: 1000,
  medium: 5000,
  long: 10000,
  navigation: 15000,
  animation: 500,
} as const;
