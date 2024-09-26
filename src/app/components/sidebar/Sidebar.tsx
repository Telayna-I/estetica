import { IoClipboardOutline, IoLogoReact } from "react-icons/io5";
import { GiHospitalCross } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { SidebarMenuItem } from "./SidebarMenuItem";

const menuItems = [
	{
		path: "/turnos",
		icon: <IoClipboardOutline size={30} />,
		title: "Turnos",
		subTitle: "Pizarra",
	},
	{
		path: "/pacientes",
		icon: <FaUsers size={30} />,
		title: "Pacientes",
		subTitle: "Fichas personales",
	},
];

export const Sidebar = () => {
	return (
		<div
			id='menu'
			style={{ width: "400px" }}
			className='bg-slate-200 min-h-screen z-10 text-slate-950 w-64 left-0 overflow-y-scroll border-slate-700'>
			<div id='logo' className='my-4 px-6'>
				<h1 className='flex items-center  text-lg md:text-2xl font-bold text-slate-950'>
					<GiHospitalCross className='mr-2' />
					<span className='text-xl'> Sistema de turnos.</span>
				</h1>
				<p className='text-slate-950 text-sm'>Gestiona tus turnos.</p>
			</div>

			<div id='profile' className='px-6 py-10'>
				<p className='text-slate-950'>Bienvenido de nuevo</p>
				<span className='text-sm md:text-base font-bold '>{"Usuario activo"}</span>
			</div>

			<div id='nav' className='w-full rounded'>
				{menuItems.map((item) => (
					<SidebarMenuItem key={item.path} {...item} />
				))}
			</div>
		</div>
	);
};
