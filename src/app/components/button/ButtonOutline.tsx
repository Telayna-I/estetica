interface Props {
	label: string;
	self?: string;
}

export const ButtonOutline = ({ label, self }: Props) => {
	return (
		<button
			className={`w-fit mt-3 self-${self} text-primary_text  font-semibold border-2 border-indigo-600 hover:bg-indigo-600  hover:text-bold hover:text-white py-1.5 px-3  rounded transition-all `}>
			{label}
		</button>
	);
};
