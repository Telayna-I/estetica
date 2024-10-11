"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaDollarSign, FaNotesMedical } from "react-icons/fa";
import clsx from "clsx";
import { LiaStethoscopeSolid } from "react-icons/lia";
import { createNewShift, deleteTreatmentImage, newPatient } from "@/actions";
import { useRouter } from "next/navigation";
import { titleFont } from "@/config/fonts";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FiCalendar, FiClock, FiDollarSign } from "react-icons/fi";
import Link from "next/link";
import { Treatment, TreatmentImage as TreatmentWithImage } from "@prisma/client";
import { TreatmentImage } from "./TreatmentImage";
import { LuArrowLeftCircle } from "react-icons/lu";

interface Props {
	treatment?: Partial<Treatment> & { TreatmentImage?: TreatmentWithImage[] };
	patientOrTreatmentId: string;
}

type FormInputs = {
	todo: string;
	tipo: string;
	price: number;
	date: string;
	hour: string;
	observations: string;
	upfrontPayment: string;
	images?: FileList;
};

const NewShiftForm = ({ treatment, patientOrTreatmentId }: Props) => {
	const router = useRouter();
	const [selected, setSelected] = useState(treatment?.tipo ? true : false);
	const [tipo, setTipo] = useState(treatment?.tipo ? treatment?.tipo : "");
	const {
		register,
		handleSubmit,
		formState: { isValid, errors },
	} = useForm<FormInputs>({
		defaultValues: {
			todo: treatment?.todo,
			observations: treatment?.observations ?? "",
			price: treatment?.price,
			date: treatment?.date,
			hour: treatment?.hour,
			upfrontPayment: treatment?.upfrontPayment?.toString(),
			images: undefined,
		},
	});

	const onSubmit = async (data: FormInputs) => {
		const formData = new FormData();

		switch (tipo) {
			case "Facial":
				data.price = facial.find((treatment) => data.todo === treatment.treatment)?.price!;
				break;
			case "Capilar":
				data.price = capilar.find((treatment) => data.todo === treatment.treatment)?.price!;
				break;
			case "Corporal":
				data.price = corporal.find(
					(treatment) => data.todo === treatment.treatment
				)?.price!;
				break;
			case "Aparatologia":
				data.price = aparatologia.find(
					(treatment) => data.todo === treatment.treatment
				)?.price!;
				break;
			default:
				break;
		}

		const { images, ...treatmentToSave } = data;

		if (treatment?.id) {
			formData.append("id", treatment?.id);
		}
		formData.append("todo", treatmentToSave.todo);
		formData.append("tipo", tipo ?? "");
		formData.append("date", treatmentToSave.date.toString());
		formData.append("price", treatmentToSave.price.toString());
		formData.append("upfrontPayment", treatmentToSave.upfrontPayment.toString());
		formData.append("hour", treatmentToSave.hour.toString());
		formData.append("observations", treatmentToSave.observations.toLowerCase());
		if (images) {
			for (let i = 0; i < images.length; i++) {
				formData.append("images", images[i]);
			}
		}
		const { ok, shift } = await createNewShift(formData, patientOrTreatmentId);

		// // TODO: TOAST;

		if (!ok) {
			alert("No se pudo crear / actualizar el paciente.");
			return;
		}

		router.replace(`/turnos/${shift?.id}`);
	};

	if (!selected) {
		return (
			<div className='flex flex-col w-3/4 m-auto border mt-16 rounded bg-white/70 shadow'>
				<h2 className={`${titleFont.className} text-center text-xl font-black my-5`}>
					Seleccione el tipo de tratamiento
				</h2>
				<div className='flex justify-center'>
					<button
						className='mx-2 px-3 py-2  rounded bg-white font-semibold text-black my-4 shadow hover:bg-indigo-500 hover:text-white'
						onClick={() => {
							setTipo("Facial");
							setSelected(true);
						}}>
						Facial
					</button>
					<button
						className='mx-2 px-3 py-2  rounded bg-white font-semibold text-black my-4 shadow hover:bg-indigo-500 hover:text-white'
						onClick={() => {
							setTipo("Capilar");
							setSelected(true);
						}}>
						Capilar
					</button>
					<button
						className='mx-2 px-3 py-2  rounded bg-white font-semibold text-black my-4 shadow hover:bg-indigo-500 hover:text-white'
						onClick={() => {
							setTipo("Corporal");
							setSelected(true);
						}}>
						Corporal
					</button>
					<button
						className='mx-2 px-3 py-2  rounded bg-white font-semibold text-black my-4 shadow hover:bg-indigo-500 hover:text-white'
						onClick={() => {
							setTipo("Aparatologia");
							setSelected(true);
						}}>
						Aparatologia
					</button>
				</div>
				<div className='flex items-center my-5 w-3/4 m-auto'>
					<div className='flex-1 border-t border-gray-500/30'></div>
					<div className='px-2 text-gray-800/30'>o</div>
					<div className='flex-1 border-t border-gray-500/30'></div>
				</div>

				<Link
					className='self-center px-5 py-2 bg-indigo-600 font-semibold text-white rounded mb-5'
					href={"/pacientes"}>
					Atras
				</Link>
			</div>
		);
	}

	if (selected)
		return (
			<div className='bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative'>
				<button>
					<LuArrowLeftCircle
						onClick={() => {
							setTipo("");
							setSelected(false);
						}}
						size={25}
						className='absolute top-10 left-10 hover:text-gray-600'
					/>
				</button>
				<div className='max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm'>
					<h2 className='text-center text-2xl font-semibold text-gray-800'>
						Datos para el turno.
					</h2>
					<form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
						<div className='space-y-4'>
							<div className=''>
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
										className={clsx(
											"block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
											{
												"border-red-500": !!errors.todo,
											}
										)}
										autoComplete='off'
										{...register("todo", { required: true })}>
										<option value=''>Seleccione</option>
										{tipo === "Facial" &&
											facial.map((treatment) => (
												<option
													value={treatment.treatment}
													key={treatment.treatment}>
													{treatment.treatment}
												</option>
											))}
										{tipo === "Capilar" &&
											capilar.map((treatment) => (
												<option
													value={treatment.treatment}
													key={treatment.treatment}>
													{treatment.treatment}
												</option>
											))}
										{tipo === "Corporal" &&
											corporal.map((treatment) => (
												<option
													value={treatment.treatment}
													key={treatment.treatment}>
													{treatment.treatment}
												</option>
											))}
										{tipo === "Aparatologia" &&
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
						<div className='flex space-x-4'>
							<div className='flex-1'>
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
										// autoComplete='off'

										className={clsx(
											"block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
											{
												"border-red-500": !!errors.date,
											}
										)}
										{...register("date", {
											required: true,
										})}
									/>
								</div>
							</div>
						</div>
						<div className='flex space-x-4'>
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
									<input
										type='string'
										autoComplete='off'
										className={clsx(
											"block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
											{
												"border-red-500": !!errors.hour,
											}
										)}
										placeholder='17:00'
										{...register("hour", {
											required: true,
										})}
									/>
								</div>
							</div>
						</div>

						{treatment?.id && (
							<div className='flex flex-col mb-2'>
								<span>Fotos</span>
								<input
									type='file'
									{...register("images")}
									multiple
									className='p-2 border rounded-md '
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
						<div className=''>
							<div className='flex-1'>
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
										className={clsx(
											"block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
											{
												"border-red-500": !!errors.upfrontPayment,
											}
										)}
										placeholder='500'
										{...register("upfrontPayment", {})}
									/>
								</div>
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
									{...register("observations", {
										required: true,
									})}></textarea>
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

export default NewShiftForm;

const facial = [
	{ treatment: "Mesoterapia facial", price: 500 },
	{ treatment: "Plasma rico en plaquetas", price: 900 },
	{ treatment: "Mesoterapia francesa", price: 500 },
	{ treatment: "Botox", price: 500 },
	{ treatment: "Baby botox", price: 500 },
	{ treatment: "Rellenos / Fillers", price: 500 },
	{ treatment: "Rinomodelacion", price: 500 },
	{ treatment: "Relleno de labios (Tecnica rusa)", price: 500 },
	{ treatment: "Relleno de ojeras", price: 500 },
	{ treatment: "Limpieza facial profunda", price: 500 },
	{ treatment: "Peeling medico", price: 500 },
	{ treatment: "Microdermoabrasion", price: 500 },
	{ treatment: "Punta de diamante", price: 500 },
];
const capilar = [
	{ treatment: "Tratamiento capilar protocolizado", price: 500 },
	{ treatment: "Hair loss solution", price: 500 },
	{ treatment: "Plasma rico en plaquetas capilar", price: 900 },
	{ treatment: "Dutasteride", price: 500 },
	{ treatment: "Alta frecuencia capilar", price: 500 },
	{ treatment: "Gorro de ozonoterapia capilar", price: 500 },
];
const corporal = [
	{ treatment: "Mesoterapia lipolipica", price: 500 },
	{ treatment: "Mesoterapia para flacidez cutanea y muscular", price: 500 },
	{ treatment: "Tratamientos protocolizados para estrias", price: 500 },
	{ treatment: "Retensado muscular", price: 500 },
	{ treatment: "Tratamientos protocolizados para aumento de masa muscular glutea", price: 500 },
	{ treatment: "Mesoterapia anticelulitico", price: 500 },
	{ treatment: "Hormonal - Ginecologico colocacion de peelet hormonal", price: 500 },
	{ treatment: "Masajes descontracturantes / relajantes", price: 500 },
	{ treatment: "Reflexologia", price: 500 },
	{ treatment: "Drenaje linfatico", price: 500 },
	{ treatment: "Depilacion descartable", price: 500 },
];
const aparatologia = [
	{ treatment: "Radiofrecuencia facial y corporal", price: 500 },
	{ treatment: "Ultracavitacion", price: 500 },
	{ treatment: "Body up", price: 500 },
	{ treatment: "Depilacion Definitiva (Soprano ICE)", price: 500 },
	{ treatment: "Ondas rusas", price: 500 },
	{ treatment: "Ozonoterapia", price: 500 },
	{ treatment: "Lipolaser", price: 500 },
];
