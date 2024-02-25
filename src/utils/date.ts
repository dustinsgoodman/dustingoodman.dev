import type { CollectionEntry } from 'astro:content';

export const formatDate = (date: Date) => {
	return date.toLocaleString('default', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		timeZone: 'UTC',
	});
};

type Entry = CollectionEntry<'blog' | 'podcasts' | 'videos' | 'conferences'>;
export const sortCollectionByDateDesc = (a: Entry, b: Entry) =>
	new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf();
