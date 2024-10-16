"use client";

import { registerUser } from "@/actions";
// import { login, registerUser } from "@/actions";
import clsx from "clsx";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
	name: string;
	email: string;
	password: string;
};

export const RegisterForm = () => {
	const [errorMessage, setErrorMessage] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormInputs>();

	const onSubmit: SubmitHandler<FormInputs> = async (data) => {
		setErrorMessage("");
		const { name, email, password } = data;

		const resp = await registerUser(name, email, password);

		if (!resp.ok) {
			setErrorMessage(resp.message);
			return;
		}

		window.location.replace("/");
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
			<label htmlFor='name'>Nombre completo</label>
			<input
				className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
					"border-red-500": !!errors.name,
				})}
				type='text'
				autoFocus
				{...register("name", { required: true })}
			/>

			<label htmlFor='email'>Correo electrónico</label>
			<input
				className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
					"border-red-500": !!errors.email,
				})}
				type='email'
				{...register("email", {
					required: true,
					pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
				})}
			/>

			<label htmlFor='text'>Contraseña</label>
			<input
				className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
					"border-red-500": !!errors.password,
				})}
				type='password'
				{...register("password", { required: true })}
			/>
			<span className='text-red-500 font-semibold mb-2'>{errorMessage}</span>

			<button className='btn-primary'>Crear cuenta</button>
		</form>
	);
};
