import Image from "next/image";

interface Props {
	src: string;
	alt: string;
	className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
	style?: React.StyleHTMLAttributes<HTMLImageElement>["style"];
	width?: number;
	height?: number;
}

export const TreatmentImage = ({ src, alt, className, width, height, style }: Props) => {
	return (
		<Image
			src={src ? src : "../../../../../public/imgs/placeholder.jpg"}
			width={width}
			height={height}
			alt={alt}
			className={className}
			style={style}
		/>
	);
};
