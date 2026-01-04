import prompts from 'prompts';

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
	const responses = await prompts(QUESTIONS);
	console.log(responses);
})();
