// Type declarations for analytics integrations

interface Window {
  gtag?: (...args: any[]) => void;
  dataLayer?: any[];
  plausible?: (eventName: string, options?: { props?: Record<string, any> }) => void;
  fathom?: {
    trackGoal: (eventName: string, value: number) => void;
  };
  umami?: {
    track: (eventName: string, data?: Record<string, any>) => void;
  };
  trackEvent?: (eventName: string, eventData?: Record<string, any>) => void;
}

declare namespace ImportMeta {
  interface Env {
    PUBLIC_ANALYTICS_PROVIDER?: 'ga4' | 'plausible' | 'fathom' | 'umami' | 'none';
    PUBLIC_ANALYTICS_ID?: string;
    PUBLIC_ANALYTICS_DOMAIN?: string;
    PUBLIC_UMAMI_SCRIPT_URL?: string;
  }
}
