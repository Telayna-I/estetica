import { Treatment } from "@prisma/client";
import NewShiftForm from "../../ui/NewShiftForm";
import { getShiftById } from "@/actions";

interface Props {
	params: {
		id: string;
	};
}

export default async function NewShiftPage({ params }: Props) {
	const { id } = params;

	const { shift } = await getShiftById(id);

	return (
		<>
			<div className='w-full'>
				<NewShiftForm treatment={shift ?? {}} patientOrTreatmentId={id} />
			</div>
		</>
	);
}
