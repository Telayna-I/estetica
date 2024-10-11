"use server";

import prisma from "@/app/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const deleteTreatmentImage = async (imageId: number, imageUrl: string) => {
	if (!imageUrl.startsWith("http")) {
		return {
			ok: false,
			error: "No se pueden borrar imagenes de FS",
		};
	}

	const imageName = imageUrl.split("/").pop()?.split(".")[0] ?? "";

	try {
		await cloudinary.uploader.destroy(imageName);
		const deleletedImage = await prisma.treatmentImage.delete({
			where: {
				id: imageId,
			},
			select: {
				treatment: {
					select: {
						id: true,
					},
				},
			},
		});

		revalidatePath("/turnos");
		revalidatePath(`/turnos/${deleletedImage.treatment.id}`);
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: "No se pudo eliminar la imagen",
		};
	}
};
