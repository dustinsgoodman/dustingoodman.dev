import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { allCategories } from 'src/types/categories';

const blogCollection = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(), // set max length,
			date: z.date(),
			heroImage: image(),
			alt: z.string(),
			originalArticle: z.string().url().optional(),
			originalSource: z.enum(['Medium', 'ThisDot']).optional(),
			tags: z.array(z.enum(allCategories)),
			redirectUrl: z.string().optional(),
		}),
});

const videosCollection = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/videos' }),
	schema: () =>
		z.object({
			title: z.string(),
			description: z.string(),
			date: z.date(),
			event: z.string().optional(),
			link: z.string().url(),
			embed: z.string().url(),
		}),
});

const podcastCollection = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/podcasts' }),
	schema: () =>
		z.object({
			title: z.string(),
			description: z.string(),
			date: z.date(),
			podcast: z.enum([
				'Modern Web',
				'Build IT Better',
				'JAMhack',
				'Engineering Leadership',
				'FSJam',
				'Human Side of Dev',
			]),
			link: z.string().url(),
			embed: z.string().url(),
			source: z.enum(['Podbean', 'Spotify', 'YouTube', 'Website']),
		}),
});

const conferenceCollection = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/conferences' }),
	schema: () =>
		z.object({
			title: z.string(),
			description: z.string(),
			conference: z.string(),
			date: z.date(),
			link: z.string().url(),
		}),
});

export const collections = {
	blog: blogCollection,
	conferences: conferenceCollection,
	podcasts: podcastCollection,
	videos: videosCollection,
};
