interface Props {
	className: string;
	title: string;
	videoUrl: string;
}

function YoutTubeVideo({ className, title, videoUrl }: Props) {
	return (
		<iframe
			className={className}
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
