export interface BlogPost {
  title: string;
  description: string;
  url: string;
  publishDate: string;
  heroImage: string;
  alt: string;
  layout: string;
  originalArticle?: string;
  originalSource?: 'Medium' | 'ThisDot';
}

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
  recordings: Array<YouTubeVideo>
}
