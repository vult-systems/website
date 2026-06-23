/**
 * SEO Helper Functions
 * 
 * Reusable functions for generating consistent SEO metadata across pages
 */

import { SITE } from './site';

interface PageSEO {
  title: string;
  description: string;
  keywords?: string;
}

/**
 * Generate page title with site branding
 */
export function getPageTitle(pageTitle: string, includeBranding = true): string {
  if (includeBranding) {
    return `${pageTitle} | ${SITE.author.name}`;
  }
  return pageTitle;
}

/**
 * Generate SEO metadata for art pages
 */
export function getArtPageSEO(title?: string): PageSEO {
  const pageTitle = title 
    ? `${title} | Art | ${SITE.author.name}`
    : `3D Art | ${SITE.author.name}`;
  
  const description = title
    ? `${title} - 3D artwork by ${SITE.author.name}`
    : `3D character art portfolio featuring character work and digital sculptures. Work created in Maya and other 3D tools.`;
  
  return {
    title: pageTitle,
    description,
    keywords: '3D Art, Digital Art, Character Art, Character Modeling, Maya, 3D Character Design'
  };
}

/**
 * Generate SEO metadata for blog pages
 */
export function getBlogPageSEO(title?: string): PageSEO {
  const pageTitle = title
    ? `${title} | Log | ${SITE.author.name}`
    : `Log | ${SITE.author.name}`;
  
  const description = title
    ? `${title} - Post by ${SITE.author.name}`
    : `Posts on 3D character art, modeling workflows, and tool development by ${SITE.author.name}.`;
  
  return {
    title: pageTitle,
    description,
    keywords: 'Blog, 3D Art, Character Art, Tutorials, Workflow, Modeling'
  };
}

/**
 * Generate SEO metadata for About page
 */
export function getAboutPageSEO(): PageSEO {
  return {
    title: `About ${SITE.author.name} | ${SITE.author.role}`,
    description: `${SITE.author.name} - ${SITE.author.role} based in ${SITE.author.location.full}. 3D character art, digital modeling, and education.`,
    keywords: `${SITE.author.name}, About, 3D Character Artist, Character Modeling, Educator, ${SITE.author.location.city}, Portfolio`
  };
}

/**
 * Generate SEO metadata for Code/Tools page
 */
export function getCodePageSEO(): PageSEO {
  return {
    title: `Code & Tools | ${SITE.author.name}`,
    description: `Tools and scripts by ${SITE.author.name}. Python and Maya tools.`,
    keywords: 'Code, Tools, Python, Maya, Scripts, Development'
  };
}

/**
 * Generate SEO metadata for Courses page
 */
export function getCoursesPageSEO(): PageSEO {
  return {
    title: `Courses | ${SITE.author.name}`,
    description: `Curriculum and course content by ${SITE.author.name}. Organic modeling, anatomy, environment, and character art courses taught for 3D Animation and Game Design.`,
    keywords: 'Courses, Curriculum, Teaching, Maya, ZBrush, Character Modeling, Environment Art, 3D Workflows, Game Design, Animation'
  };
}

/**
 * Generate SEO metadata for Resources page
 */
export function getResourcesPageSEO(): PageSEO {
  return {
    title: `Resources | ${SITE.author.name}`,
    description: `Free tools and resources by ${SITE.author.name}. ZBrush brushes and materials, Maya scripts, Substance Painter smart materials, and pipeline tools used in instruction.`,
    keywords: 'Resources, Tools, Downloads, ZBrush, Maya, Substance Painter, Scripts, Brushes, Materials, Pipeline, 3D Workflows'
  };
}

/**
 * Generate SEO metadata for the Student Work showcase page
 */
export function getStudentWorkPageSEO(): PageSEO {
  return {
    title: `Students | ${SITE.author.name}`,
    description: `A showcase of student character art and 3D work created in courses taught by ${SITE.author.name}.`,
    keywords: 'Student Work, Student Showcase, 3D Character Art, Character Modeling, Maya, ZBrush, Game Art, Portfolio'
  };
}

/**
 * Generate SEO metadata for Vult page
 */
export function getVultPageSEO(): PageSEO {
  return {
    title: `Vult | ${SITE.author.name}`,
    description: `Vult is a production studio creating cinematic crash and medical visualizations built from verified case data for litigation and mediation.`,
    keywords: 'Vult, Vult Labs, Production Studio, Crash Visualization, Medical Visualization, Litigation Support, Legal Animation, Forensic Animation'
  };
}

/**
 * Generate SEO metadata for homepage
 */
export function getHomePageSEO(): PageSEO {
  return {
    title: `${SITE.author.name} | ${SITE.author.role}`,
    description: `${SITE.author.name} is a 3D Character Artist & Educator.`,
    keywords: `${SITE.author.name}, 3D Character Artist, Character Modeling, Maya, ZBrush, Digital Art, ${SITE.author.location.city}`
  };
}
