import { z, defineCollection } from 'astro:content';
import { allCategories } from 'src/types/categories';

const blogCollection = defineCollection({
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
	schema: () =>
		z.object({
			title: z.string(),
			description: z.string(),
			date: z.date(),
			event: z.string().optional(),
			link: z.string().url(),
		}),
});

const podcastCollection = defineCollection({
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
			]),
			link: z.string().url(),
		}),
});

const conferenceCollection = defineCollection({
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
