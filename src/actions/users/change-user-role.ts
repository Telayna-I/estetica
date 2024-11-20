"use server";
import prisma from "@/app/lib/prisma";
import { auth } from "@/auth.config";
import { Role } from "@prisma/client";

import { revalidatePath } from "next/cache";

export const changeUserRole = async (userId: string, role: string) => {
	// const session = await auth();

	// if (session?.user.role !== "doctor") {
	// 	return {
	// 		ok: false,
	// 		message: "El usuario debe ser administrador.",
	// 	};
	// }

	try {
		let newRole;
		switch (role) {
			case "admin":
				newRole = "admin" as Role;
				break;
			case "doctor":
				newRole = "doctor" as Role;
				break;
			case "secretary":
				newRole = "secretary" as Role;
				break;

			default:
				newRole = "secretary" as Role;
				break;
		}

		const user = await prisma.user.update({
			where: { id: userId },
			data: {
				role: newRole,
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
			message: "No se puede atualizar el rol. Revisar logs.",
		};
	}
};
