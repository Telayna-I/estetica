"use server";

import prisma from "@/app/lib/prisma";

export const patientSearch = async (term: string) => {
	term = term.toLowerCase();

	try {
		const patient = await prisma.patient.findMany({
			where: {
				OR: [{ name: { contains: term } }, { phone: { contains: term } }],
			},
		});

		if (patient.length === 0) {
			return {
				ok: false,
				patient: [],
				message: "No se encontro el paciente.",
			};
		}

		console.log(patient);

		return {
			ok: true,
			patient,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			patient: [],
			message: "No se pudo buscar en la base de datos.",
		};
	}
};
