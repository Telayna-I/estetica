import { getPatientById, getTreatmentsFromPatient } from "@/actions";
import { Title } from "@/app/components";
import { ButtonOutline } from "@/app/components/button/ButtonOutline";
import Link from "next/link";
import { redirect } from "next/navigation";
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
import { MdLocalHospital } from "react-icons/md";

interface Props {
	params: {
		id: string;
	};
}

export default async function PatientDataDisplay({ params }: Props) {
	const { id } = params;

	const { ok, patient } = await getPatientById(id);

	const { treatments } = await getTreatmentsFromPatient(id);

	if (!ok) {
		redirect("/pacientes");
	}

	return (
		<div className='flex flex-col md:mx-24'>
			<Title title='Información del Paciente' className='mt-5' />
			<div className='buttons flex sm:flex-row justify-between mt-5'>
				<Link
					href={`/pacientes/editar-paciente/${patient?.id}`}
					className='w-fit mb-2 sm:mb-0'>
					<ButtonOutline label='Editar Paciente' self='end' />
				</Link>
				<Link href={`/turnos/nuevo-turno/${patient?.id}`} className='w-fit'>
					<ButtonOutline label='Nuevo Turno' self='end' />
				</Link>
			</div>

			<div className='w-full m-auto mt-5 p-6 bg-indigo-500/20 rounded-lg shadow-md'>
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					<div className='bg-gray-50 p-4 rounded-md transition-all duration-300 hover:bg-gray-100 focus-within:ring-2 focus-within:ring-blue-300'>
						<div className='flex items-center space-x-1 mb-2'>
							<FaUser className='h-4 w-4 text-blue-500' />
							<label className='font-medium text-gray-700'>Nombre completo</label>
						</div>
						<p className='text-gray-800 text-sm capitalize'>{patient?.name}</p>
					</div>
					<div className='bg-gray-50 p-4 rounded-md transition-all duration-300 hover:bg-gray-100 focus-within:ring-2 focus-within:ring-blue-300'>
						<div className='flex items-center space-x-1 mb-2'>
							<FaAllergies className='h-4 w-4 text-yellow-500' />
							<label className='font-medium text-gray-700'>Alergias</label>
						</div>
						<p className='text-gray-800 text-sm'>{patient?.allergies}</p>
					</div>
					<div className='bg-gray-50 p-4 rounded-md transition-all duration-300 hover:bg-gray-100 focus-within:ring-2 focus-within:ring-blue-300'>
						<div className='flex items-center space-x-1 mb-2'>
							<FaPhone className='h-4 w-4 text-green-500' />
							<label className='font-medium text-gray-700'>Número telefónico</label>
						</div>
						<p className='text-gray-800 text-sm'>{patient?.phone}</p>
					</div>
					<div className='bg-gray-50 p-4 rounded-md transition-all duration-300 hover:bg-gray-100 focus-within:ring-2 focus-within:ring-blue-300'>
						<div className='flex items-center space-x-1 mb-2'>
							<FaVenusMars className='h-4 w-4 text-purple-500' />
							<label className='font-medium text-gray-700'>Género</label>
						</div>
						<p className='text-gray-800 text-sm'>
							{patient?.gender === "man" ? "Masculino" : "Femenino"}
						</p>
					</div>
					<div className='bg-gray-50 p-4 rounded-md transition-all duration-300 hover:bg-gray-100 focus-within:ring-2 focus-within:ring-blue-300'>
						<div className='flex items-center space-x-1 mb-2'>
							<FaCalendarAlt className='h-4 w-4 text-red-500' />
							<label className='font-medium text-gray-700'>Edad</label>
						</div>
						<p className='text-gray-800 text-sm'>{patient?.age} años.</p>
					</div>
					<div className='bg-gray-50 p-4 rounded-md transition-all duration-300 hover:bg-gray-100 focus-within:ring-2 focus-within:ring-blue-300'>
						<div className='flex items-center space-x-1 mb-2'>
							<MdLocalHospital className='h-5 w-5 text-indigo-500' />
							<label className='font-medium text-gray-700'>Patologías</label>
						</div>
						<p className='text-gray-800 text-sm'>{patient?.pathologies}</p>
					</div>
					<div className='bg-gray-50 p-4 rounded-md transition-all duration-300 hover:bg-gray-100 focus-within:ring-2 focus-within:ring-blue-300 col-span-full'>
						<div className='flex items-center space-x-1 mb-2'>
							<FaPills className='h-4 w-4 text-pink-500' />
							<label className='font-medium text-gray-700'>Medicamentos en uso</label>
						</div>
						<p className='text-gray-800 text-sm'>{patient?.takeMedicine}</p>
					</div>
					<div className='bg-gray-50 p-4 rounded-md transition-all duration-300 hover:bg-gray-100 focus-within:ring-2 focus-within:ring-blue-300 col-span-full'>
						<div className='flex items-center space-x-1 mb-2'>
							<FaStethoscope className='h-4 w-4 text-teal-500' />
							<label className='font-medium text-gray-700'>
								Observaciones del médico
							</label>
						</div>
						<p className='text-gray-800 text-sm'>{patient?.observations}</p>
					</div>
				</div>
			</div>

			<div className='flex flex-col w-full m-auto mt-5 p-6 bg-white rounded-lg shadow-md'>
				<h2 className='text-lg font-semibold mb-4'>Tratamientos</h2>
				<div className='flex flex-col w-full px-4 py-4'>
					{treatments.map((shift) => (
						<div
							key={shift.id}
							className='w-full flex flex-col border border-black/5 rounded shadow-md px-5 py-8 mb-4'>
							<span className='mb-3 flex items-center'>
								<FaNotesMedical className='h-4 w-4 mr-2 text-indigo-500' />
								Tratamiento:{" "}
								<span className='font-semibold ml-1'>{shift.todo}</span>
							</span>
							<span className='mb-3 flex items-center'>
								<FaCalendarAlt className='h-4 w-4 mr-2 text-red-500' />
								Fecha: <span className='font-semibold ml-1'>{shift.date}</span>
							</span>
							<Link
								className='btn-primary w-fit self-end'
								href={`/turnos/${shift.id}`}>
								Ver más
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
