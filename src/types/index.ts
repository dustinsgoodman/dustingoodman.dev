export type BlogPost = {
	title: string;
	description: string;
	publishDate: string;
	heroImage: string;
	alt: string;
	layout: string;
	originalArticle?: string;
	originalSource?: 'Medium' | 'ThisDot';
	tags?: string[];
	redirectUrl?: string;
	url?: string;
};
