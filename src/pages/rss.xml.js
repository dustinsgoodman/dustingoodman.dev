import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';

export async function GET(context) {
	const blog = await getCollection('blog');

	const items = blog.map((post) => {
		const content = sanitizeHtml(post.body, {
			allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
		});

		return {
			title: post.data.title,
			pubDate: post.data.date,
			description: post.data.description,
			link: post.data.originalArticle
				? post.data.originalArticle
				: `/blog/${post.id}/`,
			content,
			customData: `<category>${post.data.tags.join(', ')}</category>`,
		};
	});

	return rss({
		title: "dustingoodman.dev - Dustin Goodman's Blog",
		description:
			'A blog about Engineering Leadership, Software Development, and Personal Growth',
		site: context.site,
		customData: `<language>en-us</language>`,
		items,
	});
}
