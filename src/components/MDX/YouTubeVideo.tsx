interface Props {
	title: string;
	videoUrl: string;
}

function YoutTubeVideo({ title, videoUrl }: Props) {
	return (
		<iframe
			className="mx-auto"
			width="560"
			height="315"
			src={videoUrl}
			title={title}
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		></iframe>
	);
}

export default YoutTubeVideo;
