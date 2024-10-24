"use server";

import prisma from "@/app/lib/prisma";

export const getShiftsByDate = async (date: string) => {
	try {
		const shifts = await prisma.treatment.findMany({ where: { finished: false, date } });

		if (!shifts) {
			console.log(shifts);
			return {
				ok: true,
				shifts: [],
			};
		}

		console.log(shifts);
		return {
			ok: true,
			shifts,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			shifts: [],
			message: "No se pudo acceder a la base de datos.",
		};
	}
};

// TODO FUNCION PARA COMPARAR HORA Y MINUTOS
