/// <reference types="astro/client" />

declare namespace React {
  interface HTMLAttributes<T> {
    'data-image-component'?: string;
  }
}

declare module 'astro:assets' {
  export interface LocalImageProps {
    loading?: 'eager' | 'lazy';
  }
}
