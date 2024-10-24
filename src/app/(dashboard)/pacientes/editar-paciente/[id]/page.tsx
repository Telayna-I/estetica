import { getPatientById } from "@/actions";
import NewPatientForm from "../../nuevo-paciente/ui/NewPatientForm";

interface Props {
	params: {
		id: string;
	};
}

export default async function EditPatientPage({ params }: Props) {
	const { id } = params;

	const { patient } = await getPatientById(id);

	return (
		<div className='w-full flex justify-center'>
			<NewPatientForm patient={patient} />
		</div>
	);
}
