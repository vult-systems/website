/**
 * Site Configuration
 * 
 * Central configuration for all site metadata, social links, and contact info.
 * Follow DRY principle - define once, use everywhere.
 */

export const SITE = {
  // Core site info
  name: 'carlosgarcia.works',
  url: 'https://carlosgarcia.works',
  title: 'Carlos Garcia Portfolio',
  
  // Author info
  author: {
    name: 'Carlos Garcia',
    role: '3D Character Artist & Educator',
    bio: '3D Character Artist & Educator specializing in character modeling and digital art education',
    location: {
      city: 'San Antonio',
      state: 'TX',
      stateCode: 'TX',
      country: 'US',
      full: 'San Antonio, Texas'
    },
    email: 'hello@carlosgarcia.works',
    securityEmail: 'security@carlosgarcia.works',
  },
  
  // SEO defaults
  seo: {
    defaultTitle: 'Carlos Garcia | 3D Character Artist & Educator',
    defaultDescription: 'Portfolio of Carlos Garcia - 3D Character Artist & Educator specializing in character art and education',
    keywords: [
      '3D Artist',
      '3D Character Artist',
      'Character Modeling',
      'Educator',
      'Maya',
      '3D Art',
      'Digital Art',
      'Character Design',
      'San Antonio'
    ],
    ogImage: '/og-image.png', // default OG image path
    twitterHandle: '@carlosgarcia',
  },
  
  // Social links
  social: {
    github: 'https://github.com/ProfessorGarcia',
    linkedin: 'https://linkedin.com/in/carlosgarcia',
    twitter: 'https://twitter.com/',
  },
  
  // Theme
  theme: {
    default: 'dark',
    color: '#09090b',
  },
  
  // Skills/expertise for structured data
  expertise: [
    '3D Art',
    'Character Art',
    'Pipeline Development',
    'UE5',
    'Maya',
    'Creative Education',
    'Real-time'
  ],
} as const;

// Helper to get keywords as string
export const getKeywordsString = () => SITE.seo.keywords.join(', ');

// Helper to get full location
export const getFullLocation = () => SITE.author.location.full;

// Helper to get site URL with trailing slash removed
export const getSiteUrl = () => SITE.url.replace(/\/$/, '');
