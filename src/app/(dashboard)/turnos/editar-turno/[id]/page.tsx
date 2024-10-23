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
		<div>
			<Title title={"Editar turno"} />
			<AppointmentForm treatment={appointment} patientOrTreatmentId={appointment?.id!} />
		</div>
	);
}
