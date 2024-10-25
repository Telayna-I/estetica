"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteTreatment = async (id: string) => {
	try {
		const appointment = await prisma.treatment.delete({
			where: {
				id,
			},
		});
		revalidatePath("/turnos");
		return {
			ok: true,
			message: "Tratamiento eliminado.",
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: "No se pudo eliminar el tratamiento",
		};
	}
};
