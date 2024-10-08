"use server";

import prisma from "@/app/lib/prisma";

export const getShiftById = async (id: string) => {
	try {
		const shift = await prisma.treatment.findUnique({
			where: { id },
			include: {
				patient: true,
				TreatmentImage: true,
			},
		});

		if (!shift) {
			return {
				ok: false,
				message: "No existe un turno con ese id.",
			};
		}

		return {
			ok: true,
			shift,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: "No se pudo acceder a la base de datos.",
		};
	}
};
