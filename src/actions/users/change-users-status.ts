"use server";
import prisma from "@/app/lib/prisma";
import { auth } from "@/auth.config";

import { revalidatePath } from "next/cache";

export const changeUserStatus = async (userId: string, status: string) => {
	// const session = await auth();

	// if (session?.user.role !== "doctor") {
	// 	return {
	// 		ok: false,
	// 		message: "El usuario debe ser administrador.",
	// 	};
	// }

	try {
		const user = await prisma.user.update({
			where: { id: userId },
			data: {
				status: status === "true" ? true : false,
			},
		});
		revalidatePath("/usuarios");
		return {
			ok: true,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: "No se puede atualizar el estado. Revisar logs.",
		};
	}
};
