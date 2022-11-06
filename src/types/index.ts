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

export interface YouTubeVideo {
	id: string;
	title: string;
	start?: number;
	end?: number;
	type: 'YouTube';
}

export interface ConferenceTalk {
	title: string;
	description: string;
	url: string;
	recordings: Array<YouTubeVideo>;
}
