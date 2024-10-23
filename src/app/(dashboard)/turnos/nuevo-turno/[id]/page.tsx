// "use client";
import ShiftForm from "../../ui/ShiftForm";
import { titleFont } from "@/config/fonts";
import Link from "next/link";
import { useState } from "react";
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
			<div className='w-full'>
				<AppointmentForm patientOrTreatmentId={id} />
			</div>
		</>
	);
}
