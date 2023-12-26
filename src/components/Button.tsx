import { type ReactNode } from 'react';

type Props = {
	children: ReactNode;
	className: string;
	onClick?: () => void;
	disabled?: boolean;
	[x: string]: any;
};

function Button({
	children,
	className,
	onClick = () => {},
	disabled = false,
	...rest
}: Props) {
	return (
		<button
			{...rest}
			onClick={onClick}
			className={className}
			disabled={disabled}
		>
			{children}
		</button>
	);
}

export default Button;
