// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference
// @type-check enabled!
// VSCode and other TypeScript-enabled text editors will provide auto-completion,
// helpful tooltips, and warnings if your exported object is invalid.
// You can disable this by removing "@ts-check" and `@type` comments below.
// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// import sentry from '@sentry/astro';
// import spotlightjs from '@spotlightjs/astro';

import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig(
	/** @type {import('astro').AstroUserConfig} */
	{
		site: 'https://dustingoodman.dev/',
		markdown: {
			syntaxHighlight: 'shiki',
			shikiConfig: {
				theme: 'github-dark-dimmed',
			},
			rehypePlugins: [
				rehypeSlug,
				[
					rehypeAutolinkHeadings,
					{
						behavior: 'wrap',
					},
				],
				[
					rehypeExternalLinks,
					{
						target: '_blank',
						rel: ['nofollow', 'noopener', 'noreferrer'],
					},
				],
			],
		},
		integrations: [
			react(),
			tailwind({
				applyBaseStyles: false,
			}),
			sitemap(),
		],
		redirects: {
			'/blog/202220414-serverless-template-announcement':
				'/blog/20220414-serverless-template-announcement',
			'/blog/202040506-thoughts-on-the-future-of-http-apis':
				'20240506-thoughts-on-the-future-of-http-apis',
		},
	}
);
