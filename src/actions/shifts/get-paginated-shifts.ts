"use server";

import prisma from "@/app/lib/prisma";

export const getPaginateShifts = async () => {
	try {
		const shifts = await prisma.treatment.findMany({
			where: {
				finished: false,
			},
			include: {
				patient: true,
			},
			orderBy: {
				date: "asc",
			},
		});

		if (!shifts) {
			return {
				ok: true,
				shifts: [],
			};
		}

		return {
			ok: true,
			shifts,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: true,
			shifts: [],
		};
	}
};
