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
	slides: string;
	cospeakers: Array<Cospeaker>;
	appearances: Array<ConferenceTalkAppearance>;
}

export interface Cospeaker {
	name: string;
	twitter: string;
	profilePic: string;
}

export interface ConferenceTalkAppearance {
	name: string;
	videoUrl?: string;
	youtubeId?: string;
}
