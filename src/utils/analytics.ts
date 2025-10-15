export type AnalyticsEvent =
  | { name: 'page_view'; data?: { path: string; title: string } }
  | { name: 'artwork_viewed'; data: { title: string; category: string; slug: string } }
  | { name: 'project_viewed'; data: { title: string; type: string; slug: string } }
  | { name: 'blog_post_viewed'; data: { title: string; slug: string } }
  | { name: 'theme_toggle'; data: { mode: 'light' | 'dark' } }
  | { name: 'file_download'; data: { file: string; url: string } }
  | { name: 'outbound_link'; data: { url: string; text: string } };

export function trackEvent<T extends AnalyticsEvent>(event: T): void {
  if (typeof window !== 'undefined' && window.trackEvent) {
    window.trackEvent(event.name, event.data);
  }
}

export function trackArtworkView(title: string, category: string, slug: string): void {
  trackEvent({ name: 'artwork_viewed', data: { title, category, slug } });
}

export function trackProjectView(title: string, type: string, slug: string): void {
  trackEvent({ name: 'project_viewed', data: { title, type, slug } });
}
