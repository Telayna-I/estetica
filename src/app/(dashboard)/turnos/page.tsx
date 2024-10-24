import { Title } from "@/app/components";
import { FaCalendar } from "react-icons/fa";

import { AppointmentsTable } from "./ui/AppointmentsTable";
import { getPaginateShifts } from "@/actions";

export default async function ShiftsPage() {
	const { ok, shifts } = await getPaginateShifts();

	return (
		<>
			<Title title={"Turnos"} />
			<div className='flex flex-col border rounded w-full md:w-3/4 px-4 md:px-16 m-auto mt-16'>
				<span className='flex items-center my-5 text-center md:text-left'>
					<FaCalendar className='h-4 w-4' />
					<span className='text-secondary_text ml-1'>Turnos del día</span>
				</span>

				<AppointmentsTable appointments={shifts} />
			</div>
		</>
	);
}
