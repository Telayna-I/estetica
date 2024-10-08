import { getPatientById } from "@/app/actions";
import { Title } from "@/app/components";
import { ButtonOutline } from "@/app/components/button/ButtonOutline";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import {
	FaPhone,
	FaVenusMars,
	FaCalendarAlt,
	FaAllergies,
	FaPills,
	FaStethoscope,
	FaNotesMedical,
	FaUser,
} from "react-icons/fa";

interface Props {
	params: {
		id: string;
	};
}

export default async function PatientDataDisplay({ params }: Props) {
	const { id } = params;

	const { ok, patient } = await getPatientById(id);

	if (!ok) {
		redirect("/pacientes");
	}

	return (
		<div className='flex flex-col mx-24'>
			<Title title='Informacion del Paciente' className='mt-5' />
			<Link href={`/turnos/nuevo-turno/${patient?.id}`} className='w-fit self-end'>
				<ButtonOutline label='Nuevo Turno' self='end' />
			</Link>
			<div className='w-full m-auto mt-5 p-6 bg-indigo-500/20 rounded-lg shadow-md'>
				<div className='space-y-4 flex flex-col'>
					<div className='flex justify-between gap-4'>
						<div
							className={`bg-gray-50 p-4 w-full rounded-md transition-all duration-300 hover:bg-gray-100 focus-within:ring-2 focus-within:ring-blue-300 col-span-full
						`}>
							<div className='flex items-center space-x-1 mb-2'>
								<span className='text-blue-500'>
									{<FaUser className='h-4 w-4 text-blue-500' />}
								</span>
								<label className='font-medium  text-gray-700'>
									Nombre completo
								</label>
							</div>
							<p className='text-gray-800 text-sm capitalize '>{patient?.name}</p>
						</div>
						<div
							className={`bg-gray-50 p-4 space-y-4 w-full rounded-md transition-all duration-300 hover:bg-gray-100 focus-within:ring-2 focus-within:ring-blue-300 col-span-full
						`}>
							<div className='flex items-center space-x-1 mb-2'>
								<span className='text-blue-500'>
									<FaAllergies className='h-4 w-4 text-yellow-500' />
								</span>
								<label className='font-medium text-gray-700'>Alergias</label>
							</div>
							<p className='text-gray-800 text-sm'>{patient?.allergies}</p>
						</div>
					</div>
					<div className='flex justify-between gap-4'>
						<div
							className={`bg-gray-50 p-4 w-full rounded-md transition-all duration-300 hover:bg-gray-100 focus-within:ring-2 focus-within:ring-blue-300 col-span-full
						`}>
							<div className='flex items-center space-x-1 mb-2'>
								<span className='text-blue-500'>
									{<FaPhone className='h-4 w-4 text-green-500' />}
								</span>
								<label className='font-medium  text-gray-700'>
									Numero telefonico
								</label>
							</div>
							<p className='text-gray-800 text-sm  '>{patient?.phone}</p>
						</div>
						<div
							className={`bg-gray-50 p-4 w-full rounded-md transition-all duration-300 hover:bg-gray-100 focus-within:ring-2 focus-within:ring-blue-300 col-span-full
						`}>
							<div className='flex items-center space-x-1 mb-2'>
								<span className='text-blue-500'>
									{<FaVenusMars className='h-4 w-4 text-purple-500' />}
								</span>
								<label className='font-medium  text-gray-700'>Genero</label>
							</div>
							<p className='text-gray-800 text-sm  '>
								{patient?.gender === "man" ? "Masculino" : "Femenino"}
							</p>
						</div>

						<div
							className={`bg-gray-50 p-4 w-full rounded-md transition-all duration-300 hover:bg-gray-100 focus-within:ring-2 focus-within:ring-blue-300 col-span-full
						`}>
							<div className='flex items-center space-x-1 mb-2'>
								<span className='text-blue-500'>
									<FaCalendarAlt className='h-4 w-4 text-red-500' />
								</span>
								<label className='font-medium text-gray-700'>Edad</label>
							</div>
							<p className='text-gray-800 text-sm'>{patient?.age} años.</p>
						</div>
					</div>
					<div className='flex justify-between gap-4'>
						<div
							className={`bg-gray-50 p-4 space-y-4 w-full rounded-md transition-all duration-300 hover:bg-gray-100 focus-within:ring-2 focus-within:ring-blue-300 col-span-full
						`}>
							<div className='flex items-center space-x-1 mb-2'>
								<span className='text-blue-500'>
									<FaNotesMedical className='h-4 w-4 text-indigo-500' />
								</span>
								<label className='font-medium text-gray-700'>
									Tratamientos actuales
								</label>
							</div>
							<p className='text-gray-800 text-sm'>{patient?.recentTreatment}</p>
						</div>

						<div
							className={`bg-gray-50 p-4 space-y-4 w-full rounded-md transition-all duration-300 hover:bg-gray-100 focus-within:ring-2 focus-within:ring-blue-300 col-span-full
						`}>
							<div className='flex items-center space-x-1 mb-2'>
								<span className='text-blue-500'>
									<FaPills className='h-4 w-4 text-pink-500' />
								</span>
								<label className='font-medium text-gray-700'>
									Medicamentos en uso
								</label>
							</div>
							<p className='text-gray-800 text-sm'>{patient?.takeMedicine}</p>
						</div>
					</div>

					<div
						className={`bg-gray-50 p-4 space-y-4 w-full rounded-md transition-all duration-300 hover:bg-gray-100 focus-within:ring-2 focus-within:ring-blue-300 col-span-full
						`}>
						<div className='flex items-center space-x-1 mb-2'>
							<span className='text-blue-500'>
								<FaStethoscope className='h-4 w-4 text-teal-500' />
							</span>
							<label className='font-medium text-gray-700'>
								Observaciones del medico
							</label>
						</div>
						<p className='text-gray-800 text-sm'>{patient?.observations}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
