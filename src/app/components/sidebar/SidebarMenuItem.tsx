"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
	path: string;
	icon: JSX.Element;
	title: string;
	subTitle?: string;
}

export const SidebarMenuItem = ({ path, icon, title, subTitle }: Props) => {
	const currentPath = usePathname();

	return (
		<Link
			href={path}
			className={`
            w-full px-2 inline-flex space-x-2 items-center border-slate-700 py-3 hover:bg-white/5 transition ease-linear duration-150
            ${currentPath === path ? "bg-slate-500" : ""}`}>
			<div>
				<div>{icon}</div>
			</div>
			<div className='flex flex-col'>
				<span className='text-lg font-bold leading-5 text-slate-950'>{title}</span>
				<span className='text-sm text-slate-950/80 hidden md:block pl-1'>{subTitle}</span>
			</div>
		</Link>
	);
};
