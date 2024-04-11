import React, { useState } from 'react';

interface ShowMoreProps {
	text: string;
}

const ShowMore: React.FC<ShowMoreProps> = ({ text }) => {
	const [expanded, setExpanded] = useState(false);

	const toggleExpanded = () => {
		setExpanded(!expanded);
	};

	const getDisplayText = () => {
		if (expanded) {
			return text;
		}

		const truncatedText = text.substring(0, 230);
		if (truncatedText !== text) {
			return `${text.substring(0, 230)}...`;
		}

		return text;
	};

	const displayText = getDisplayText();
	console.log(displayText, text);

	return (
		<div>
			{displayText}
			{displayText === text ? null : (
				<>
					&nbsp;
					<button
						className="text-blue-500 hover:underline"
						onClick={toggleExpanded}
					>
						{expanded ? 'Read less' : 'Read more'}
					</button>
				</>
			)}
		</div>
	);
};

export default ShowMore;
