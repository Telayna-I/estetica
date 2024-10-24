import AppointmentForm from "../../ui/AppointmentForm";

interface Props {
	params: {
		id: string;
	};
}

export default async function NewShiftPage({ params }: Props) {
	const { id } = params;

	return (
		<>
			<div className='w-full px-4 sm:px-6 lg:px-8'>
				<AppointmentForm patientOrTreatmentId={id} />
			</div>
		</>
	);
}
