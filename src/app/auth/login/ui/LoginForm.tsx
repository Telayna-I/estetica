"use client";

import { authenticate } from "@/actions";
import { Input } from "@nextui-org/react";

import clsx from "clsx";

import Link from "next/link";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { IoInformationOutline, IoWarning } from "react-icons/io5";

export const LoginForm = () => {
	const [state, dispatch] = useFormState(authenticate, undefined);

	console.log({ state: state });

	useEffect(() => {
		if (state === "Success") {
			window.location.replace("/");
		}
	}, [state]);

	return (
		<form action={dispatch} className='flex flex-col'>
			<label htmlFor='email'>Correo electrónico</label>
			<input
				className='px-5 py-2 border border-black/5 outline-none focus:border-black/45 bg-gray-200 rounded mb-5'
				name='email'
				type='email'
			/>

			<label htmlFor='password'>Contraseña</label>
			<input
				className='px-5 py-2 border border-black/5 outline-none focus:border-black/45 bg-gray-200 rounded mb-5'
				name='password'
				type='password'
			/>
			<div className='flex h-8 items-end space-x-1' aria-live='polite' aria-atomic='true'>
				{state === "CredentialsSignin" && (
					<div className='flex flex-row mb-2'>
						<IoInformationOutline className='h-5 w-5 text-red-500' />
						<p className='text-sm text-red-500'>Las credenciales no son correctas</p>
					</div>
				)}
			</div>

			<LoginButton />
		</form>
	);
};

function LoginButton() {
	const { pending } = useFormStatus();

	return (
		<button
			type='submit'
			className={clsx({
				"btn-primary": !pending,
				"btn-disabled": pending,
			})}
			disabled={pending}>
			Ingresar
		</button>
	);
}
