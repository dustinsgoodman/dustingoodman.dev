import BlueskyIcon from '@/components/Icons/BlueskyIcon.astro';
import GithubIcon from '@/components/Icons/GithubIcon.astro';
import LinkedInIcon from '@/components/Icons/LinkedInIcon.astro';
import TwitchIcon from '@/components/Icons/TwitchIcon.astro';
import TwitterIcon from '@/components/Icons/TwitterIcon.astro';

export const socialLinks = [
	{
		href: 'https://twitter.com/dustinsgoodman',
		label: "Dustin's Twitter",
		icon: TwitterIcon,
	},
	{
		href: 'https://www.linkedin.com/in/dustinsgoodman/',
		label: "Dustin's LinkedIn",
		icon: LinkedInIcon,
	},
	{
		href: 'https://github.com/dustinsgoodman',
		label: "Dustin's Github",
		icon: GithubIcon,
	},
	{
		href: 'https://www.twitch.tv/sharocko',
		label: "Dustin's Twitch",
		icon: TwitchIcon,
	},
	{
		href: 'https://bsky.app/profile/dustingoodman.dev',
		label: "Dustin's Bluesky",
		icon: BlueskyIcon,
	},
];
