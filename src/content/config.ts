import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
	schema: ({ image }) =>
		z.object({
			draft: z.boolean().optional(),
			title: z.string(),
			description: z.string(), // set max length,
			publishDate: z.date(),
			heroImage: image(),
			alt: z.string(),
			originalArticle: z.string().url().optional(),
			originalSource: z.enum(['Medium', 'ThisDot']).optional(),
			tags: z.array(z.string()),
			redirectUrl: z.string().optional(),
		}),
});

export const collections = {
	blog: blogCollection,
};
