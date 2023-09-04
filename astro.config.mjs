// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference
// @type-check enabled!
// VSCode and other TypeScript-enabled text editors will provide auto-completion,
// helpful tooltips, and warnings if your exported object is invalid.
// You can disable this by removing "@ts-check" and `@type` comments below.
// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

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
				[
					'rehype-autolink-headings',
					{
						behavior: 'prepend',
					},
				],
				[
					'rehype-external-links',
					{
						target: '_blank',
						rel: ['nofollow', 'noopener', 'noreferrer'],
					},
				],
			],
		},
		integrations: [
			tailwind({
				applyBaseStyles: false,
			}),
			react(),
		],
	}
);
