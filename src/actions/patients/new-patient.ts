"use server";

import prisma from "@/app/lib/prisma";
import { Gender, Patient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const patientSchema = z.object({
	id: z.string().uuid().optional().nullable(),
	name: z.string().min(3).max(255),
	phone: z.string().min(10).max(13),
	gender: z.nativeEnum(Gender),
	age: z.coerce
		.number()
		.min(5)
		.max(99)
		.transform((val) => Number(val)),
	allergies: z.string(),
	takeMedicine: z.string(),
	pathologies: z.string(),
	observations: z.string(),
});

export const newPatient = async (formData: FormData) => {
	const data = Object.fromEntries(formData);
	const parsedPatient = patientSchema.safeParse(data);

	if (!parsedPatient.success) {
		console.log(parsedPatient.error);
		return { ok: false };
	}

	const patient = parsedPatient.data;

	const { id, ...rest } = patient;

	try {
		const prismaTx = await prisma.$transaction(async () => {
			let patient: Patient;

			// const parsedPrice = Number(rest.price);

			if (id) {
				// Actualizar
				patient = await prisma.patient.update({
					where: { id },
					data: {
						...rest,
					},
				});
			} else {
				// Crear
				patient = await prisma.patient.create({
					data: {
						...rest,
					},
				});
			}

			return { patient };
		});
		revalidatePath("/pacientes");
		// revalidatePath(`/admin/product/${product.slug}`);
		// revalidatePath(`/products/${product.slug}`);
		return { ok: true, patient: prismaTx.patient };
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: "Revisar los logs no se pudo actualizar/crear",
		};
	}
};
