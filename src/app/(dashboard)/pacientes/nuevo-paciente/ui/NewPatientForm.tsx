"use client";

import { Gender, Patient } from "@prisma/client";
import { useForm } from "react-hook-form";
import { FaUser, FaPhone, FaCalendarAlt, FaVenusMars, FaAllergies, FaPills } from "react-icons/fa";
import { LiaStethoscopeSolid } from "react-icons/lia";
import { newPatient } from "@/actions";
import { useRouter } from "next/navigation";
import { MdLocalHospital } from "react-icons/md";
import { toast } from "sonner";

type FormInputs = {
	name: string;
	phone: string;
	gender: Gender;
	age: number;
	allergies: string;
	takeMedicine: string;
	pathologies: string;
	observations: string;
};

interface Props {
	patient?: Patient;
}

const NewPatientForm = ({ patient: patientToEdit }: Props) => {
	const router = useRouter();
	const { register, handleSubmit } = useForm<FormInputs>({
		defaultValues: {
			age: patientToEdit?.age,
			name: patientToEdit?.name,
			phone: patientToEdit?.phone,
			allergies: patientToEdit?.allergies ?? "",
			takeMedicine: patientToEdit?.takeMedicine ?? "",
			pathologies: patientToEdit?.pathologies ?? "",
			observations: patientToEdit?.observations ?? "",
			gender: patientToEdit?.gender,
		},
	});

	const onSubmit = async (data: FormInputs) => {
		const formData = new FormData();

		if (patientToEdit?.id) {
			formData.append("id", patientToEdit?.id ?? "");
		}
		formData.append("name", data.name.toLowerCase() ?? "");
		formData.append("phone", data.phone ?? "");
		formData.append("gender", data.gender ?? "");
		formData.append("age", data.age.toString() ?? "");
		formData.append("allergies", data.allergies.toLowerCase() ?? "");
		formData.append("pathologies", data.pathologies.toLowerCase() ?? "");
		formData.append("takeMedicine", data.takeMedicine.toLowerCase() ?? "");
		formData.append("observations", data.observations.toLowerCase() ?? "");

		const { ok, patient } = await newPatient(formData);

		if (!ok) {
			if (patientToEdit?.id) {
				toast.error("No se pudo crear el paciente.", {
					position: "bottom-center",
				});
			} else {
				toast.error("No se pudo actualizar el paciente.", {
					position: "bottom-center",
				});
			}
			return;
		} else {
			if (patientToEdit?.id) {
				toast.success("Paciente actualizado correctamente.", {
					position: "bottom-center",
				});
			} else {
				toast.success("Paciente creado correctamente.", {
					position: "bottom-center",
				});
			}
		}

		router.replace(`/pacientes/${patient?.id}`);
	};

	return (
		<div className='min-h-screen bg-gray-50 flex items-center justify-center sm:px-6 lg:px-8'>
			<div className='max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm'>
				<h2 className='text-center text-2xl font-semibold text-gray-800 mb-4'>
					Información del Paciente
				</h2>
				<form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
					<div className='space-y-4'>
						{/* Nombre Completo */}
						<div>
							<label
								htmlFor='name'
								className='block text-sm font-medium text-gray-700'>
								Nombre completo
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<FaUser className='h-4 w-4 text-gray-400' />
								</div>
								<input
									type='text'
									autoComplete='off'
									className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									placeholder='John Doe'
									{...register("name", { required: true })}
								/>
							</div>
						</div>

						{/* Número Telefónico */}
						<div>
							<label
								htmlFor='phone'
								className='block text-sm font-medium text-gray-700'>
								Número telefónico
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<FaPhone className='h-4 w-4 text-gray-400' />
								</div>
								<input
									type='tel'
									autoComplete='off'
									className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									placeholder='(2932) - 223344'
									{...register("phone", {
										required: true,
										pattern: {
											value: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/,
											message: "El formato de teléfono no es correcto",
										},
									})}
								/>
							</div>
						</div>

						{/* Edad y Género */}
						<div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4'>
							<div className='flex-1'>
								<label
									htmlFor='age'
									className='block text-sm font-medium text-gray-700'>
									Edad
								</label>
								<div className='mt-1 relative rounded-md shadow-sm'>
									<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
										<FaCalendarAlt className='h-4 w-4 text-gray-400' />
									</div>
									<input
										type='number'
										autoComplete='off'
										className='block w-full pl-10 pr-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
										placeholder='25'
										{...register("age", {
											required: true,
											min: 1,
											max: 100,
										})}
									/>
								</div>
							</div>

							<div className='flex-1'>
								<label
									htmlFor='gender'
									className='block text-sm font-medium text-gray-700'>
									Género
								</label>
								<div className='mt-1 relative rounded-md shadow-sm'>
									<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
										<FaVenusMars className='h-5 w-5 text-gray-400' />
									</div>
									<select
										className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
										autoComplete='off'
										{...register("gender", { required: true })}>
										<option value=''>Seleccione</option>
										<option value='man'>Masculino</option>
										<option value='woman'>Femenino</option>
									</select>
								</div>
							</div>
						</div>

						{/* Alergias */}
						<div>
							<label
								htmlFor='allergies'
								className='block text-sm font-medium text-gray-700'>
								Alergias
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 pt-2 pointer-events-none'>
									<FaAllergies className='h-5 w-5 text-gray-400' />
								</div>
								<textarea
									rows={4}
									autoComplete='off'
									className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									placeholder='Especificar cualquier alergia'
									maxLength={500}
									{...register("allergies", { required: true })}></textarea>
							</div>
						</div>

						{/* Patologías */}
						<div>
							<label
								htmlFor='pathologies'
								className='block text-sm font-medium text-gray-700'>
								Patologías
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 pt-2 pointer-events-none'>
									<MdLocalHospital className='h-5 w-5 text-gray-400' />
								</div>
								<textarea
									rows={4}
									autoComplete='off'
									className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									placeholder='Especificar patologías'
									maxLength={500}
									{...register("pathologies", { required: true })}></textarea>
							</div>
						</div>

						{/* Toma Medicina */}
						<div>
							<label
								htmlFor='takeMedicine'
								className='block text-sm font-medium text-gray-700'>
								Toma medicina
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 pt-2 pointer-events-none'>
									<FaPills className='h-5 w-5 text-gray-400' />
								</div>
								<textarea
									rows={4}
									autoComplete='off'
									className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									placeholder='Especificar medicación actual'
									{...register("takeMedicine", { required: true })}
									maxLength={500}></textarea>
							</div>
						</div>

						{/* Observaciones */}
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
									placeholder='Observaciones del médico'
									maxLength={1000}
									{...register("observations", { required: true })}></textarea>
							</div>
						</div>
					</div>

					{/* Botón de Envío */}
					<div>
						<button
							type='submit'
							className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out'>
							{patientToEdit?.id ? "Actualizar paciente" : "Crear paciente"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default NewPatientForm;
