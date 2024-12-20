"use client";

export const revalidate = 10;
import { FaDollarSign, FaNotesMedical } from "react-icons/fa";
import { LiaStethoscopeSolid } from "react-icons/lia";
import { FiCalendar, FiClock } from "react-icons/fi";
import { Treatment, TreatmentImage as TreatmentWithImage } from "@prisma/client";
import { TreatmentImage } from "./TreatmentImage";
import { aparatologia, availableTimes, capilar, corporal, facial } from "@/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createNewShift, deleteTreatmentImage, getShiftsByDate } from "@/actions";
import { toast } from "sonner";

interface Props {
	treatment?: Partial<Treatment> & { TreatmentImage?: TreatmentWithImage[] };
	patientOrTreatmentId?: string;
}

const ShiftForm = ({ treatment, patientOrTreatmentId }: Props) => {
	const router = useRouter();
	const [date, setDate] = useState<string>(treatment?.date || "");
	const [type, setType] = useState<string>(treatment?.tipo || "");
	const [appointments, setAppointments] = useState<Treatment[]>();
	const [selectedHour, setSelectedHour] = useState<string>();
	const [availableMinutes, setAvailableMinutes] = useState<number[]>([0, 15, 30, 45]);

	const handleChangeDate = async (date: string) => {
		const { shifts } = await getShiftsByDate(date);

		setAppointments(shifts);
		setDate(date);
	};

	const handleSubmit = async (formData: FormData) => {
		const data = Object.fromEntries(formData);

		let price;

		switch (type) {
			case "Facial":
				price = facial.find((treatment) => data.todo === treatment.treatment)?.price;
				break;
			case "Capilar":
				price = capilar.find((treatment) => data.todo === treatment.treatment)?.price;
				break;
			case "Corporal":
				price = corporal.find((treatment) => data.todo === treatment.treatment)?.price;
				break;
			case "Aparatologia":
				price = aparatologia.find((treatment) => data.todo === treatment.treatment)?.price;
				break;
			default:
				break;
		}
		const { images } = data;

		if (treatment?.id) {
			formData.append("id", treatment?.id);
		}
		formData.append("price", price?.toString() || "");
		if (images && typeof images === "string") {
			toast.error("Images es un string, no un array");
		} else if (images instanceof FileList) {
			if (images) {
				for (let i = 0; i < images.length; i++) {
					formData.append("images", images[i]);
				}
			}
		}

		const { ok, shift } = await createNewShift(formData, patientOrTreatmentId!);

		if (!ok) {
			if (treatment?.id) {
				toast.error("No se pudo crear el turno.", {
					position: "bottom-center",
				});
			} else {
				toast.error("No se pudo actualizar el turno.", {
					position: "bottom-center",
				});
			}
			return;
		} else {
			if (treatment?.id) {
				toast.success("Turno actualizado correctamente.", {
					position: "bottom-center",
				});
			} else {
				toast.success("Turno creado correctamente.", {
					position: "bottom-center",
				});
			}
		}
		router.replace(`/turnos/${shift?.id}`);
	};

	useEffect(() => {
		const horarioEncontrado = availableTimes.find((h) => h.hora.toString() === selectedHour);

		if (horarioEncontrado) {
			const turnosOcupadosEnHora = appointments
				?.filter((appointment) => appointment.hour.toString() === selectedHour)
				?.map((appointment) => appointment.minutes);

			const leakedMinutes = horarioEncontrado.minutos.filter(
				(minuto) => !turnosOcupadosEnHora?.includes(minuto)
			);
			setAvailableMinutes(leakedMinutes);
		}
	}, [appointments, selectedHour, type]);

	return (
		<div className='flex items-center justify-center px-4 sm:px-6 lg:px-8 relative'>
			<div className='max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm'>
				<h2 className='text-center text-2xl font-semibold text-gray-800'>
					Datos para el turno.
				</h2>
				<form className='mt-8 space-y-6' action={handleSubmit}>
					<div className='space-y-4'>
						<div>
							<label
								htmlFor='tipo'
								className='block text-sm font-medium text-gray-700'>
								Tipo de tratamiento
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<FaNotesMedical className='h-5 w-5 text-gray-400' />
								</div>
								<select
									className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									autoComplete='off'
									name='tipo'
									onChange={(e) => setType(e.target.value)}
									defaultValue={treatment?.tipo}
									required>
									<option value=''>Seleccione</option>
									<option value='Facial'>Facial</option>
									<option value='Capilar'>Capilar</option>
									<option value='Corporal'>Corporal</option>
									<option value='Aparatologia'>Aparatologia</option>
								</select>
							</div>
						</div>
					</div>
					{type && (
						<div className='space-y-4'>
							<div>
								<label
									htmlFor='todo'
									className='block text-sm font-medium text-gray-700'>
									Tratamiento
								</label>
								<div className='mt-1 relative rounded-md shadow-sm'>
									<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
										<FaNotesMedical className='h-5 w-5 text-gray-400' />
									</div>
									<select
										className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
										autoComplete='off'
										required
										name='todo'
										defaultValue={treatment?.todo}>
										<option value=''>Seleccione</option>
										{type === "Facial" &&
											facial.map((treatment) => (
												<option
													value={treatment.treatment}
													key={treatment.treatment}>
													{treatment.treatment}
												</option>
											))}
										{type === "Capilar" &&
											capilar.map((treatment) => (
												<option
													value={treatment.treatment}
													key={treatment.treatment}>
													{treatment.treatment}
												</option>
											))}
										{type === "Corporal" &&
											corporal.map((treatment) => (
												<option
													value={treatment.treatment}
													key={treatment.treatment}>
													{treatment.treatment}
												</option>
											))}
										{type === "Aparatologia" &&
											aparatologia.map((treatment) => (
												<option
													value={treatment.treatment}
													key={treatment.treatment}>
													{treatment.treatment}
												</option>
											))}
									</select>
								</div>
							</div>
						</div>
					)}
					<div className='space-y-4'>
						<div>
							<label
								htmlFor='date'
								className='block text-sm font-medium text-gray-700'>
								Fecha
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<FiCalendar className='h-5 w-5 text-gray-400' />
								</div>
								<input
									type='date'
									required
									name='date'
									onChange={(e) => handleChangeDate(e.target.value)}
									defaultValue={treatment?.date}
									className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
								/>
							</div>
						</div>
						{date && (
							<div className='flex flex-col sm:flex-row sm:space-x-4'>
								<div className='flex-1'>
									<label
										htmlFor='hour'
										className='block text-sm font-medium text-gray-700'>
										Hora
									</label>
									<div className='mt-1 relative rounded-md shadow-sm'>
										<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
											<FiClock className='h-5 w-5 text-gray-400' />
										</div>
										<select
											className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
											name='hour'
											defaultValue={treatment?.hour}
											required
											onChange={(e) => setSelectedHour(e.target.value)}
											autoComplete='off'>
											{availableTimes.map((horario) => (
												<option key={horario.hora} value={horario.hora}>
													{horario.hora}:00
												</option>
											))}
										</select>
									</div>
								</div>
								<div className='flex-1'>
									<label
										htmlFor='minutes'
										className='block text-sm font-medium text-gray-700'>
										Minutos
									</label>
									<div className='mt-1 relative rounded-md shadow-sm'>
										<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
											<FiClock className='h-5 w-5 text-gray-400' />
										</div>
										<select
											className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
											name='minutes'
											required
											defaultValue={treatment?.minutes}
											autoComplete='off'>
											{availableMinutes.length > 0 ? (
												availableMinutes.map((minuto, index) => (
													<option key={index} value={minuto}>
														{minuto < 10 ? `0${minuto}` : minuto}
													</option>
												))
											) : (
												<option>No hay minutos disponibles</option>
											)}
										</select>
									</div>
								</div>
							</div>
						)}
					</div>
					{treatment?.id && (
						<div className='flex flex-col mb-2'>
							<span>Fotos</span>
							<input
								type='file'
								name='images'
								multiple
								className='p-2 border rounded-md w-full'
								accept='image/png, image/jpeg, image/avif'
							/>
						</div>
					)}
					<div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
						{treatment?.TreatmentImage?.map((image) => (
							<div key={image.id}>
								<TreatmentImage
									src={image.url}
									alt={treatment.todo ?? ""}
									width={300}
									height={300}
									className='rounded-t shadow-md'
								/>
								<button
									onClick={() => deleteTreatmentImage(image.id, image.url)}
									type='button'
									className='btn-danger rounded-b-xl w-full'>
									Eliminar
								</button>
							</div>
						))}
					</div>
					<div>
						<label
							htmlFor='upfrontPayment'
							className='block text-sm font-medium text-gray-700'>
							Seña
						</label>
						<div className='mt-1 relative rounded-md shadow-sm'>
							<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
								<FaDollarSign className='h-4 w-4 text-gray-400' />
							</div>
							<input
								inputMode='numeric'
								pattern='[0-9]*'
								type='text'
								autoComplete='off'
								className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
								placeholder='500'
								name='upfrontPayment'
								defaultValue={treatment?.upfrontPayment?.toString()}
								required
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor='observations'
							className='block text-sm font-medium text-gray-700'>
							Observaciones
						</label>
						<div className='mt-1 relative rounded-md shadow-sm'>
							<div className='absolute inset-y-0 left-0 pl-3 pt-2 pointer-events-none'>
								<LiaStethoscopeSolid className='h-6 w-6 text-gray-400' />
							</div>
							<textarea
								rows={5}
								autoComplete='off'
								className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
								placeholder='Observaciones del medico'
								maxLength={1000}
								name='observations'
								defaultValue={treatment?.observations || ""}
								required></textarea>
						</div>
					</div>
					<div>
						<button
							type='submit'
							className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out'>
							{treatment?.id ? "Actualizar turno" : "Crear turno"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ShiftForm;
