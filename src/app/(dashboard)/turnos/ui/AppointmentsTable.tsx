"use client";
import { DropdownMenu } from "./DropdownMenu";
import Link from "next/link";
import { FiCalendar, FiClock } from "react-icons/fi";
import clsx from "clsx";
import { Prisma } from "@prisma/client";
import {
	addFormattedDateToTreatments,
	dailyFilterAppointments,
	monthlyFilterAndSortAppointments,
	weeklyFilterAndSortAppointments,
} from "@/utils";
import { useState } from "react";

type TreatmentWithRelations = Prisma.TreatmentGetPayload<{
	include: {
		patient: true;
	};
}>;

interface Props {
	appointments: TreatmentWithRelations[];
}

export const AppointmentsTable = ({ appointments }: Props) => {
	const [sortedAppointments, setSortedAppointments] = useState(
		addFormattedDateToTreatments(appointments)
	);

	const handleChange = (value: string) => {
		let sorted;
		switch (value) {
			case "todos":
				sorted = addFormattedDateToTreatments(appointments);
				setSortedAppointments(sorted);
				break;
			case "semanal":
				sorted = weeklyFilterAndSortAppointments(appointments);
				setSortedAppointments(sorted);
				break;
			case "mensual":
				sorted = monthlyFilterAndSortAppointments(appointments);
				setSortedAppointments(sorted);
				break;
			case "diario":
				sorted = dailyFilterAppointments(appointments);
				setSortedAppointments(sorted);
				break;

			default:
				break;
		}
	};

	return (
		<>
			<div className='flex flex-col md:flex-row w-full rounded shadow transition-all mb-3 border p-5 mt-5 bg-white items-center'>
				<span className='mr-2 text-sm font-bold'>Filtrando por: </span>
				<select
					className={clsx(
						"block w-full md:w-fit px-2  border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					)}
					name='hour'
					required={true}
					onChange={(e) => handleChange(e.target.value)}
					autoComplete='off'>
					<option value='todos'>Todos</option>
					<option value='mensual'>Mensual</option>
					<option value='semanal'>Semanal</option>
					<option value='diario'>Diario</option>
				</select>
				{/* <span className='ml-10 font-thin text-black/10 '>Pega un tiro manco</span> */}
			</div>

			<div className='flex flex-col mt-5'>
				{sortedAppointments?.map((appointment) => (
					<div
						className='flex flex-col p-3 border rounded mb-5 relative w-full hover:bg-gray-200 transition-all shadow'
						key={appointment.id}>
						<div className='flex justify-between items-center mb-3 capitalize'>
							<span className='text-lg'>{appointment.patient.name}</span>
							<DropdownMenu treatmentId={appointment.id} />
						</div>
						<Link href={`/turnos/${appointment.id}`}>
							<div className='flex flex-col'>
								<span className='flex items-center mb-3'>
									<FiCalendar className='h-4 w-4' />
									<span className='text-sm ml-1'>
										{appointment.formattedDate}
									</span>
								</span>
								<span className='flex items-center'>
									<FiClock className='h-4 w-4' />
									<span className='text-sm ml-1'>
										{appointment.hour} :{" "}
										{appointment.minutes === 0 ? "00" : appointment.minutes}
									</span>
								</span>
							</div>
						</Link>
					</div>
				))}
			</div>
		</>
	);
};
