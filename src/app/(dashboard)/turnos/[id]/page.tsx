import { getShiftById } from "@/actions";
import { Title } from "@/app/components";
import DateTimeDisplay from "@/components/ui/colck/DateTimeDisplay";
import { FaAllergies, FaDollarSign, FaNotesMedical, FaUserAlt } from "react-icons/fa";
import { FiCalendar, FiClock } from "react-icons/fi";
import { TreatmentImage } from "../ui/TreatmentImage";
import { DropdownMenu } from "../ui/DropdownMenu";

interface Props {
	params: {
		id: string;
	};
}

export default async function ShiftPage({ params }: Props) {
	const { id } = params;

	const { ok, shift } = await getShiftById(id);

	return (
		<>
			<div className='flex justify-between mt-10'>
				<Title title={"Detalles del turno"} />
				<DateTimeDisplay />
			</div>
			<div className='max-w-3xl mx-auto bg-white shadow-lg rounded-md overflow-hidden mt-10 relative'>
				<div className='px-6 py-4 absolute right-0 top-0 z-10'>
					<DropdownMenu treatmentId={id} />
				</div>
				<div className='px-6 py-4 relative'>
					<div className='space-y-4'>
						<div className='flex items-center relative capitalize'>
							<FaUserAlt className='text-blue-500 mr-2' />
							<span className='font-semibold'>Nombre completo:</span>
							<span className='ml-2'>{shift?.patient.name}</span>
						</div>
						<div className='flex items-center relative'>
							<FaAllergies className='text-yellow-500 mr-2' />
							<span className='font-semibold'>Alergias:</span>
							<span className='ml-2'>{shift?.patient.allergies}</span>
						</div>
						<div className='flex items-center relative'>
							<FaNotesMedical className='text-indigo-500 mr-2' />
							<span className='font-semibold'>Tratamiento:</span>
							<span className='ml-2'>{shift?.todo}</span>
						</div>
						<div className='flex items-center relative'>
							<FiCalendar className='text-red-500 mr-2' />
							<span className='font-semibold'>Fecha:</span>
							<span className='ml-2'>{shift?.date}</span>
						</div>
						<div className='flex items-center relative'>
							<FaDollarSign className='text-green-600 mr-2' />
							<span className='font-semibold'>Precio:</span>
							<span className='ml-2'>{shift?.price}</span>
						</div>
						<div className='flex  relative'>
							<div className='flex items-center'>
								<FaDollarSign className='text-green-600 mr-2' />
								<span className='font-semibold'>Seña:</span>
								<span className='ml-2'>{shift?.upfrontPayment}</span>
							</div>
						</div>
						<div className='flex  relative'>
							<div className='flex items-center'>
								<FaDollarSign className='text-green-600 mr-2' />
								<span className='font-semibold'>Restan:</span>
								<span className='ml-2'>
									{shift?.price! - shift?.upfrontPayment!}
								</span>
							</div>
						</div>
						<div className='flex items-center relative'>
							<FiClock className='text--500 mr-2' />
							<span className='font-semibold'>Hora:</span>
							<span className='ml-2'>
								{shift?.hour} : {shift?.minutes}
							</span>
						</div>
					</div>
				</div>
				<div className='px-6 py-4 bg-gray-50'>
					<h3 className='text-lg font-semibold text-gray-800 mb-2'>Fotos</h3>
					<div className='flex space-x-4'>
						<div className='w-1/2'>
							<TreatmentImage
								src={
									shift?.TreatmentImage[0]?.url ??
									"https://res.cloudinary.com/telayna-i/image/upload/v1728345656/placeholder_g94ztn.jpg"
								}
								alt={shift?.todo!}
								width={300}
								height={300}
								className='w-full rounded'
							/>
						</div>
						<div className='w-1/2'>
							<TreatmentImage
								src={
									shift?.TreatmentImage[1]?.url ??
									"https://res.cloudinary.com/telayna-i/image/upload/v1728345656/placeholder_g94ztn.jpg"
								}
								alt={shift?.todo!}
								className='w-full rounded'
								width={300}
								height={300}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
