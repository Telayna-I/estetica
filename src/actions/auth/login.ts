"use server";

import { signIn } from "@/auth.config";

// ...

export async function authenticate(prevState: string | undefined, formData: FormData) {
	try {
		await signIn("credentials", {
			...Object.fromEntries(formData),
			redirect: false,
		});

		return "Success";
	} catch (error) {
		console.log(error);

		return "CredentialsSignin";
	}
}

// SOLO PARA CUANDO QUIERA HACER LOGIN INMEDIATAMENTE DESPUES DEL REGISTRO.
// COMO EL ADMINISTRADOR VA A GENERAR LOS USARIOS NO QUEREMOS QUE LOGUEE EL USUARIO RECIEN CREADO.

// export const login = async (email: string, password: string) => {
// 	try {
// 		await signIn("credentials", { email, password });
// 		return {
// 			ok: true,
// 		};
// 	} catch (error) {
// 		console.log(error);
// 		return {
// 			ok: false,
// 			message: "No se pudo iniciar sesion",
// 		};
// 	}
// };
