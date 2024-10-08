"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export const finishTreatment = async (id: string) => {
	try {
		await prisma.treatment.update({
			where: { id },
			data: {
				finished: true,
			},
		});

		revalidatePath("/turnos");
		return {
			ok: true,
			message: "Tratamiento finalizado.",
		};
	} catch (error) {
		console.log(error);
		return {
			ok: true,
			message: "No se puedo finalizar el tratamiento.",
		};
	}
};
