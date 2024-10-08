import { getPaginateShifts } from "@/app/actions";
import { Title } from "@/app/components";
import { DropdownMenu } from "./ui/DropdownMenu";
import Link from "next/link";
import { FaCalendar } from "react-icons/fa";
import { FiCalendar, FiClock } from "react-icons/fi";

export default async function ShiftsPage() {
	const { ok, shifts } = await getPaginateShifts();

	return (
		<>
			<Title title={"Turnos."} />
			<div className='flex flex-col border rounded w-3/4 px-16 m-auto mt-16'>
				<span className='flex items-center mt-5'>
					<FaCalendar className='h-4 w-4' />
					<span className='text-secondary_text ml-1'>Turnos del dia</span>
				</span>
				<div className='flex flex-col mt-5'>
					{shifts.map((shift) => (
						<div
							className='flex flex-col p-3 border rounded  mb-5 relative w-full hover:bg-gray-200 transition-all shadow'
							key={shift.id}>
							<div className='flex  justify-between items-center mb-3 capitalize'>
								<span className='text-lg '>{shift.patient.name}</span>
								<DropdownMenu treatmentId={shift.id} />
							</div>
							<Link href={`/turnos/${shift.id}`}>
								<div className='flex- flex-col'>
									<span className='flex items-center mb-3'>
										<FiCalendar className='h-4 w-4' />
										<span className='text-sm ml-1'>{shift.date}</span>
									</span>
									<span className='flex items-center'>
										<FiClock className='h-4 w-4' />
										<span className='text-sm ml-1'>{shift.hour}</span>
									</span>
								</div>
							</Link>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
