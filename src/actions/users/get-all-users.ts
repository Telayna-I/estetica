"use server";

import prisma from "@/app/lib/prisma";
import { auth } from "@/auth.config";

export const getAllUsers = async () => {
	const session = await auth();

	if (session?.user.role !== "doctor") {
		return {
			ok: false,
			message: "Debe ser un usuario autorizado.",
			users: [],
		};
	}

	try {
		const users = await prisma.user.findMany({});

		if (!users) {
			return {
				ok: false,
				message: "No hay usuarios para mostrar",
				users: [],
			};
		}

		return {
			ok: true,
			users,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: "No se pudo buscar los usuarios.",
			users: [],
		};
	}
};
