/// <reference types="astro/client" />

declare module 'astro:assets' {
  export interface LocalImageProps {
    loading?: 'eager' | 'lazy';
  }
}
