import prompts from 'prompts';
import { kebabCase } from 'lodash';
import { Document } from 'yaml';

import { allCategories } from './src/types/categories';

const QUESTIONS = [
	{
		type: 'autocomplete',
		name: 'contentType',
		message: 'What kind of entry are you creating?',
		choices: [
			{ title: 'Blog Post', value: 'blog' },
			{ title: 'Conference Talk', value: 'conference' },
			{ title: 'Podcast', value: 'podcast' },
			{ title: 'Video', value: 'videos' },
		],
	},
	{
		type: 'text',
		name: 'title',
		message: 'What is the title of the entry?',
	},
	{
		type: 'multiselect',
		name: 'tags',
		message: 'How should this entry be tagged?',
		choices: allCategories,
		hint: '- Space to select. Return to submit',
	},
];

(async () => {
	const { contentType, title, tags } = await prompts(QUESTIONS);
	const now = new Date();
	const filename = generateFileName(title, now);

	let template;
	switch (contentType) {
		case 'blog':
			template = generateBlogTemplate({ title, date: now, tags, filename });
			break;
		case 'conference':
		case 'podcast':
		case 'videos':
		default:
			template = {};
	}

	// generate yaml document
	const doc = new Document(template);
	console.log(doc.toString());
	// todo: write to file

})();

function generateFileName(title: string, date: Date) {
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
	const year = date.getFullYear();
	return `${year}${month}${day}-${kebabCase(title)}`;
}

function generateBlogTemplate({
	title,
	date,
	tags,
	filename,
}: {
	title: string;
	date: Date,
	tags: number[];
	filename: string;
}) {
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
	const year = date.getFullYear();

	return {
		title,
		description: title,
		date: `${year}-${month}-${day}`,
		heroImage: `./blog-assets/${filename}.webp`,
		alt: title,
		tags: tags.map((tagIdx) => allCategories[tagIdx]),
	};
}