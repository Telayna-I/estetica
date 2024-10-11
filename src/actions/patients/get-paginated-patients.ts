"use server";

import prisma from "@/app/lib/prisma";

interface PaginationOptions {
	page?: number;
	take?: number;
}

export const getPaginatedPatients = async ({ page = 1, take = 12 }: PaginationOptions) => {
	if (isNaN(Number(page))) page = 1;
	if (page < 1) page = 1;

	try {
		const patients = await prisma.patient.findMany({
			take,
			skip: (page - 1) * take,
			orderBy: {
				name: "asc",
			},
		});

		const totalCount = await prisma.patient.count();

		const totalPages = Math.ceil(Number(totalCount) / take);

		return {
			ok: true,
			currentPage: page,
			totalPages,
			patients,
		};
	} catch (error) {
		console.log(error);
		return { ok: false, message: "No se pudieron obtener los pacientes.", patients: [] };
	}
};
