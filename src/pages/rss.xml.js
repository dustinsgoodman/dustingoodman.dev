import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context) {
	const blog = await getCollection('blog');
	console.log(blog);

	return rss({
		title: "dustingoodman.dev - Dustin Goodman's Blog",
		description:
			'A blog about Engineering Leadership, Software Development, and Personal Growth',
		site: context.site,
		customData: `<language>en-us</language>`,
		items: blog.map((post) => ({
			title: post.data.title,
			pubDate: post.data.date,
			description: post.data.description,
			content: sanitizeHtml(parser.render(post.body), {
				allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
			}),
			customData: `
        <category>${post.data.tags.join(', ')}</category>
      `,
			link: post.data.originalArticle
				? post.data.originalArticle
				: `/blog/${post.id}/`,
		})),
	});
}
