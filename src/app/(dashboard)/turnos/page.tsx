import { Title } from "@/app/components";
import { FaCalendar } from "react-icons/fa";

import { AppointmentsTable } from "./ui/AppointmentsTable";
import { getPaginateShifts } from "@/actions";

export default async function ShiftsPage() {
	const { shifts } = await getPaginateShifts();

	return (
		<>
			<Title title={"Turnos"} />
			<div className='flex flex-col border rounded w-full md:w-3/4 bg-white/80 p-4 py-3 md:px-16 m-auto mt-16'>
				<AppointmentsTable appointments={shifts} />
			</div>
		</>
	);
}
