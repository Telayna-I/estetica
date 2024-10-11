"use server";

import prisma from "@/app/lib/prisma";

export const getTreatmentsFromPatient = async (patientId: string) => {
	try {
		const treatments = await prisma.treatment.findMany({ where: { patientId } });

		if (!treatments) {
			return {
				ok: false,
				treatments: [],
				message: "El usuario no tiene tratamientos.",
			};
		}

		return {
			ok: true,
			treatments,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			treatments: [],
			message: "No se pudieron obtener los tratamientos",
		};
	}
};
