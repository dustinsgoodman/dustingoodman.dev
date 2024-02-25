import { z, defineCollection } from 'astro:content';
import { allCategories } from 'src/types/categories';

const blogCollection = defineCollection({
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(), // set max length,
			publishDate: z.date(),
			heroImage: image(),
			alt: z.string(),
			originalArticle: z.string().url().optional(),
			originalSource: z.enum(['Medium', 'ThisDot']).optional(),
			tags: z.array(z.enum(allCategories)),
			redirectUrl: z.string().optional(),
		}),
});

const videosCollection = defineCollection({
	schema: () =>
		z.object({
			title: z.string(),
			description: z.string(),
			publishDate: z.date(),
			event: z.string().optional(),
			link: z.string().url(),
		}),
});

const podcastCollection = defineCollection({
	schema: () =>
		z.object({
			title: z.string(),
			description: z.string(),
			publishDate: z.date(),
			podcast: z.enum([
				'Modern Web',
				'Build IT Better',
				'JAMhack',
				'Engineering Leadership',
				'FSJam',
			]),
			link: z.string().url(),
		}),
});

export const collections = {
	blog: blogCollection,
	podcasts: podcastCollection,
	videos: videosCollection,
};
