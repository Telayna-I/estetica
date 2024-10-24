import { Prisma, Treatment } from "@prisma/client";

type TreatmentWithRelations = Prisma.TreatmentGetPayload<{
	include: {
		patient: true;
	};
}>;

interface Props {
	appointments: TreatmentWithRelations[];
}

export const monthlyFilterAndSortAppointments = (
	appointments: TreatmentWithRelations[]
): (TreatmentWithRelations & { formattedDate: string })[] => {
	const currentDate = new Date();
	const endDate = new Date();
	endDate.setDate(currentDate.getDate() + 31); // 31 días después

	return appointments
		.filter((appointment) => {
			const treatmentDate = new Date(
				`${appointment.date}T${appointment.hour
					.toString()
					.padStart(2, "0")}:${appointment.minutes.toString().padStart(2, "0")}:00`
			);
			return treatmentDate >= currentDate && treatmentDate <= endDate;
		})
		.map((appointment) => {
			const treatmentDate = new Date(
				`${appointment.date}T${appointment.hour
					.toString()
					.padStart(2, "0")}:${appointment.minutes.toString().padStart(2, "0")}:00`
			);
			return {
				...appointment,
				formattedDate: treatmentDate.toLocaleDateString("es-AR", {
					year: "numeric",
					month: "long",
					day: "numeric",
					hour: "2-digit",
					minute: "2-digit",
					hour12: false,
				}),
				treatmentDate, // Guardar la fecha para poder ordenar
			};
		})
		.sort((a, b) => a.treatmentDate.getTime() - b.treatmentDate.getTime()); // Ordenar de más reciente a más lejano
};

export const dailyFilterAppointments = (
	appointments: TreatmentWithRelations[]
): (TreatmentWithRelations & { formattedDate: string })[] => {
	const currentDate = new Date();
	const startOfToday = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		currentDate.getDate()
	);
	const endOfToday = new Date(startOfToday);
	endOfToday.setDate(endOfToday.getDate() + 1); // Al día siguiente, para incluir todo el día de hoy

	return appointments
		.filter((appointment) => {
			const treatmentDate = new Date(
				`${appointment.date}T${appointment.hour
					.toString()
					.padStart(2, "0")}:${appointment.minutes.toString().padStart(2, "0")}:00`
			);
			return treatmentDate >= startOfToday && treatmentDate < endOfToday;
		})
		.map((appointment) => {
			const treatmentDate = new Date(
				`${appointment.date}T${appointment.hour
					.toString()
					.padStart(2, "0")}:${appointment.minutes.toString().padStart(2, "0")}:00`
			);
			return {
				...appointment,
				formattedDate: treatmentDate.toLocaleDateString("es-AR", {
					year: "numeric",
					month: "long",
					day: "numeric",
					hour: "2-digit",
					minute: "2-digit",
					hour12: false,
				}),
				treatmentDate, // Guardar la fecha para poder ordenar
			};
		})
		.sort((a, b) => a.treatmentDate.getTime() - b.treatmentDate.getTime()); // Ordenar de más reciente a más lejano
};

export const addFormattedDateToTreatments = (
	appointments: TreatmentWithRelations[]
): (TreatmentWithRelations & { formattedDate: string })[] => {
	return appointments
		.map((appointment) => {
			const treatmentDate = new Date(
				`${appointment.date}T${appointment.hour
					.toString()
					.padStart(2, "0")}:${appointment.minutes.toString().padStart(2, "0")}:00`
			);
			return {
				...appointment,
				formattedDate: treatmentDate.toLocaleDateString("es-AR", {
					year: "numeric",
					month: "long",
					day: "numeric",
					hour: "2-digit",
					minute: "2-digit",
					hour12: false,
				}),
				treatmentDate, // Guardar la fecha para poder ordenar
			};
		})
		.sort((a, b) => a.treatmentDate.getTime() - b.treatmentDate.getTime()); // Ordenar de más cercana a más lejana
};

export const weeklyFilterAndSortAppointments = (
	appointments: TreatmentWithRelations[]
): (TreatmentWithRelations & { formattedDate: string })[] => {
	const currentDate = new Date();
	const nextWeekDate = new Date(currentDate);
	nextWeekDate.setDate(currentDate.getDate() + 7);

	return appointments
		.filter((appointment) => {
			const treatmentDate = new Date(
				`${appointment.date}T${appointment.hour
					.toString()
					.padStart(2, "0")}:${appointment.minutes.toString().padStart(2, "0")}:00`
			);
			return treatmentDate >= currentDate && treatmentDate <= nextWeekDate;
		})
		.map((appointment) => {
			const treatmentDate = new Date(
				`${appointment.date}T${appointment.hour
					.toString()
					.padStart(2, "0")}:${appointment.minutes.toString().padStart(2, "0")}:00`
			);
			return {
				...appointment,
				formattedDate: treatmentDate.toLocaleDateString("es-AR", {
					year: "numeric",
					month: "long",
					day: "numeric",
					hour: "2-digit",
					minute: "2-digit",
					hour12: false,
				}),
				treatmentDate, // Guardar la fecha para poder ordenar
			};
		})
		.sort((a, b) => a.treatmentDate.getTime() - b.treatmentDate.getTime()); // Ordenar de más reciente a más lejano
};
