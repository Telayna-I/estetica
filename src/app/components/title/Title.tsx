import { titleFont } from "@/config/fonts";

interface Props {
	title: string;
	subTitle?: string;
	className?: string;
}

export const Title = ({ title, subTitle, className }: Props) => {
	return (
		<div className={` ${className}`}>
			<h1
				className={`${titleFont.className} text-primary_text antialiased text-4xl font-semibold`}>
				{title}
			</h1>

			{subTitle && (
				<h3 className='text-sm mb-5 pl-2 text-secondary_text font-semibold'>{subTitle}</h3>
			)}
		</div>
	);
};
