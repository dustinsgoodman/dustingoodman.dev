export const formatDate = (date: Date) => {
	return date.toLocaleString('default', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		timeZone: 'UTC',
	});
};
