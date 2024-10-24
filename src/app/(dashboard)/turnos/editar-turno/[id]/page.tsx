import { Title } from "@/app/components";

import { getShiftById } from "@/actions";
import AppointmentForm from "../../ui/AppointmentForm";

interface Props {
	params: {
		id: string;
	};
}
export default async function AppointmentEditPage({ params }: Props) {
	const { id } = params;

	const { shift: appointment } = await getShiftById(id);

	return (
		<div className='px-4 sm:px-6 lg:px-8'>
			<Title title={"Editar turno"} />
			<AppointmentForm treatment={appointment} patientOrTreatmentId={appointment?.id!} />
		</div>
	);
}
