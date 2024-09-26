import { titleFont } from "@/config/fonts";

interface Props {
	title: string;
	subTitle?: string;
	className?: string;
}

export const Title = ({ title, subTitle, className }: Props) => {
	return (
		<div className={`mt-3 ${className}`}>
			<h1 className={`${titleFont.className} antialiased text-4xl font-semibold mt-10`}>
				{title}
			</h1>

			{subTitle && <h3 className='text-sm mb-5 pl-2 font-semibold'>{subTitle}</h3>}
		</div>
	);
};
