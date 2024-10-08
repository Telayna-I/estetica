"use server";

import prisma from "@/app/lib/prisma";

export const getPatientById = async (id: string) => {
	try {
		const patient = await prisma.patient.findUnique({
			where: {
				id,
			},
		});

		if (!patient) {
			return {
				ok: false,
				message: "No hay ningun paciente con ese id.",
			};
		}

		return {
			ok: true,
			patient,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: "No se pudo realizar la peticion.",
		};
	}
};
