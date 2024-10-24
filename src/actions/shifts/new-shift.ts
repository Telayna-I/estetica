"use server";

import prisma from "@/app/lib/prisma";
import { auth } from "@/auth.config";
import { Treatment } from "@prisma/client";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config(process.env.CLOUDINARY_URL ?? "");

const shiftSchema = z.object({
	id: z.string().uuid().optional().nullable(),
	todo: z.string().min(3).max(255),
	hour: z.string().min(2).max(255),
	minutes: z.string().min(1).max(255),
	observations: z.string(),
	date: z.string(),
	tipo: z.string(),
	price: z.coerce
		.number()
		.min(0)
		.transform((val) => Number(val).toFixed(2)),
	upfrontPayment: z.coerce
		.string()
		.min(0)
		.transform((val) => Number(val).toFixed(2)),
});

export const createNewShift = async (formData: FormData, patientOrTreatmentId: string) => {
	const data = Object.fromEntries(formData);
	const session = await auth();

	const parsedShift = shiftSchema.safeParse(data);

	if (!parsedShift.success) {
		console.log(parsedShift.error);
		return { ok: false };
	}

	const shift = parsedShift.data;
	const { id, ...rest } = shift;

	try {
		const prismaTx = await prisma.$transaction(async (tx) => {
			const userId = session!.user.id;
			let shift: Treatment;
			const parsedPrice = Number(rest.price);
			const parsedUpfrontPayment = Number(rest.upfrontPayment);

			if (id) {
				// Actualizar
				shift = await prisma.treatment.update({
					where: { id },
					data: {
						...rest,
						hour: Number(rest.hour),
						minutes: Number(rest.minutes),
						price: parsedPrice,
						upfrontPayment: parsedUpfrontPayment,
					},
				});
			} else {
				// Crear
				shift = await prisma.treatment.create({
					data: {
						todo: rest.todo,
						tipo: rest.tipo,
						hour: Number(rest.hour),
						minutes: Number(rest.minutes),
						date: rest.date,
						observations: rest.observations,
						price: parsedPrice,
						upfrontPayment: parsedUpfrontPayment,
						userId,
						patientId: patientOrTreatmentId,
					},
				});
			}

			const images = formData.getAll("images") as File[];

			if (images[0]?.size > 0) {
				const images = await uploadImages(formData.getAll("images") as File[]);

				if (!images) {
					throw new Error("No se pudo cargar las imagenes, rollingBack");
				}

				await prisma.treatmentImage.createMany({
					data: images.map((image) => ({
						url: image!,
						treatmentId: shift.id,
					})),
				});
			}

			return { shift };
		});
		revalidatePath("/turnos");
		revalidatePath(`/turnos/${shift.id}`);
		return { ok: true, shift: prismaTx.shift };
	} catch (error) {
		console.log({ error });
		return {
			ok: false,
			message: "Revisar los logs no se pudo actualizar/crear",
		};
	}
};

const uploadImages = async (images: File[]) => {
	try {
		const uploadPromises = images.map(async (image) => {
			try {
				const buffer = await image.arrayBuffer();
				const base64Image = Buffer.from(buffer).toString("base64");

				return cloudinary.uploader
					.upload(`data:image/png;base64,${base64Image}`)
					.then((r) => r.secure_url);
			} catch (error) {
				console.log(error);
				return null;
			}
		});

		const uploadedImages = await Promise.all(uploadPromises);

		return uploadedImages;
	} catch (error) {
		console.log(error);
		return null;
	}
};
