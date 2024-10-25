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

	const { shift } = await getShiftById(id);

	return (
		<>
			<div className='flex flex-col md:flex-row justify-between mt-10'>
				<Title title={"Detalles del turno"} className='mb-5' />
				<DateTimeDisplay />
			</div>

			<div className='max-w-full md:max-w-3xl mx-auto bg-white shadow-lg rounded-md overflow-hidden mt-10 relative'>
				<div className='px-6 py-4 absolute right-0 top-0 z-10'>
					<DropdownMenu treatmentId={id} />
				</div>

				<div className='px-6 py-4 relative'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{[
							{
								icon: <FaUserAlt className='text-blue-500 mr-2' />,
								label: "Nombre completo:",
								value: shift?.patient.name,
							},
							{
								icon: <FaAllergies className='text-yellow-500 mr-2' />,
								label: "Alergias:",
								value: shift?.patient.allergies,
							},
							{
								icon: <FaNotesMedical className='text-indigo-500 mr-2' />,
								label: "Tratamiento:",
								value: shift?.todo,
							},
							{
								icon: <FiCalendar className='text-red-500 mr-2' />,
								label: "Fecha:",
								value: shift?.date,
							},
							{
								icon: <FaDollarSign className='text-green-600 mr-2' />,
								label: "Precio:",
								value: shift?.price,
							},
							{
								icon: <FaDollarSign className='text-green-600 mr-2' />,
								label: "Seña:",
								value: shift?.upfrontPayment,
							},
							{
								icon: <FaDollarSign className='text-green-600 mr-2' />,
								label: "Restan:",
								value: (shift?.price ?? 0) - (shift?.upfrontPayment ?? 0),
							},
							{
								icon: <FiClock className='text-gray-500 mr-2' />,
								label: "Hora:",
								value: `${shift?.hour} : ${shift?.minutes}`,
							},
						].map(({ icon, label, value }, index) => (
							<div className='flex items-start' key={index}>
								{icon}
								<div className='ml-2 flex-1'>
									<span className='font-semibold'>{label}</span>
									<span className='block'>{value}</span>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className='px-6 py-4 bg-gray-50'>
					<h3 className='text-lg font-semibold text-gray-800 mb-2'>Fotos</h3>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<div className='w-full'>
							<TreatmentImage
								src={
									shift?.TreatmentImage[0]?.url ??
									"https://res.cloudinary.com/telayna-i/image/upload/v1728345656/placeholder_g94ztn.jpg"
								}
								alt={shift?.todo ?? "treatment-image-1"}
								width={300}
								height={300}
								className='w-full rounded'
							/>
						</div>
						<div className='w-full'>
							<TreatmentImage
								src={
									shift?.TreatmentImage[1]?.url ??
									"https://res.cloudinary.com/telayna-i/image/upload/v1728345656/placeholder_g94ztn.jpg"
								}
								alt={shift?.todo ?? "treatment-image-2"}
								width={300}
								height={300}
								className='w-full rounded'
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
