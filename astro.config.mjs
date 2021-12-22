// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference

// @type-check enabled!
// VSCode and other TypeScript-enabled text editors will provide auto-completion,
// helpful tooltips, and warnings if your exported object is invalid.
// You can disable this by removing "@ts-check" and `@type` comments below.

// @ts-check
import { imagetools } from 'vite-imagetools';

export default /** @type {import('astro').AstroUserConfig} */ ({
  buildOptions: {
    site: 'https://dustingoodman.dev/',
  },
  // Enable the Preact renderer to support Preact JSX components.
  renderers: ['@astrojs/renderer-preact'],
  vite: {
    plugins: [imagetools()],
  },
});
