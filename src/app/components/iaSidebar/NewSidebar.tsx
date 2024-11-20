"use client";
import { useState, useEffect } from "react";
import { FiUsers, FiUserPlus } from "react-icons/fi";
import { FaChartBar, FaRegClipboard } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/actions";

const SideNavigation = () => {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const currentPath = usePathname();

	useEffect(() => {
		const handleResize = () => {
			setIsCollapsed(window.innerWidth < 768);
		};
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const toggleCollapse = () => setIsCollapsed(!isCollapsed);

	const navItems = [
		{ name: "Pacientes", icon: <FiUsers />, path: "/pacientes" },
		{ name: "Turnos", icon: <FaRegClipboard />, path: "/turnos" },
		{ name: "Usuarios", icon: <FaChartBar />, path: "/usuarios" },
		{ name: "Nuevo Usuario", icon: <FiUserPlus />, path: "/auth/new-account" },
	];

	return (
		<nav
			className={`flex flex-col border border-r-color_border/45 shadow-md min-h-screen p-4 transition-all duration-300 bg-white text-gray-800 ${
				isCollapsed ? "w-16" : "w-64"
			} shadow-lg`}>
			<div className='flex items-center justify-between mb-8'>
				{!isCollapsed && <h1 className='text-xl font-bold'>Menú</h1>}
				<button
					onClick={toggleCollapse}
					className='p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					aria-label={isCollapsed ? "Expandir barra lateral" : "Colapsar barra lateral"}>
					{isCollapsed ? "≡" : "×"}
				</button>
			</div>

			<ul className='space-y-2 flex-grow'>
				{navItems.map((item) => (
					<li key={item.name}>
						<Link
							href={item.path}
							onClick={toggleCollapse}
							className={`flex items-center w-full p-2 rounded-md transition-colors duration-200 ${
								currentPath.includes(item.path)
									? "bg-indigo-500 text-white"
									: "hover:bg-gray-200"
							}`}>
							<span className='mr-3'>{item.icon}</span>
							{!isCollapsed && (
								<span className='flex-grow text-left'>{item.name}</span>
							)}
						</Link>
					</li>
				))}
				{/* <button
					onClick={() => {
						logout();
						toggleCollapse();
					}}
					className='flex items-center w-full p-2 rounded-md transition-colors duration-200 hover:bg-gray-200'>
					<span className='mr-3'>{<TbLogout size={18} />}</span>
					{!isCollapsed && <span className='flex-grow text-left'>Salir</span>}
				</button> */}
			</ul>
		</nav>
	);
};

export default SideNavigation;
