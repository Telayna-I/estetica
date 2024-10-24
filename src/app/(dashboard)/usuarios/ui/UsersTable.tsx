"use client";

import { changeUserRole, changeUserStatus } from "@/actions";
import { User } from "@prisma/client";
import { FaCircle } from "react-icons/fa";
import { toast } from "sonner";

interface Props {
	users: User[];
}

export const UsersTable = ({ users }: Props) => {
	const handleChangeUserStatus = async (userId: string, status: string) => {
		const { ok } = await changeUserStatus(userId, status);
		if (ok) {
			toast.success("Status actualizado correctamente.", {
				position: "bottom-center",
			});
		} else {
			toast.error("No se pudo actualizar el status.", {
				position: "bottom-center",
			});
		}
	};

	const handleChangeUserRole = async (userId: string, status: string) => {
		const { ok } = await changeUserRole(userId, status);
		if (ok) {
			toast.success("Rol actualizado correctamente.", {
				position: "bottom-center",
			});
		} else {
			toast.error("No se pudo actualizar el rol.", {
				position: "bottom-center",
			});
		}
	};
	return (
		<div className='overflow-x-auto'>
			<table className='min-w-full mt-3'>
				<thead className='bg-gray-200 border-b'>
					<tr>
						<th className='text-sm font-medium text-gray-900 px-4 py-3 text-left sm:px-6'>
							Nombre
						</th>
						<th className='text-sm font-medium text-gray-900 px-4 py-3 text-left sm:px-6'>
							Email
						</th>
						<th className='text-sm font-medium text-gray-900 px-4 py-3 text-left sm:px-6'>
							Acciones
						</th>
						<th className='text-sm font-medium text-gray-900 px-4 py-3 text-left sm:px-6'>
							Estado
						</th>
					</tr>
				</thead>
				<tbody>
					{users?.map((user) => (
						<tr
							key={user.id}
							className='bg-white border-b transition duration-300 ease-in-out hover:bg-indigo-100'>
							<td className='px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 capitalize sm:px-6'>
								{user.name}
							</td>
							<td className='px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 sm:px-6'>
								{user.email}
							</td>
							<td className='text-sm text-gray-900 font-light px-4 py-3 whitespace-nowrap sm:px-6'>
								<select
									className='text-sm text-gray-900 w-full p-2 rounded outline-none'
									value={user.role}
									onChange={(e) => handleChangeUserRole(user.id, e.target.value)}>
									<option className='rounded' value='admin'>
										Admin
									</option>
									<option className='rounded' value='doctor'>
										Doctor
									</option>
									<option className='rounded' value='secretary'>
										Secretary
									</option>
								</select>
							</td>
							<td className='flex items-center text-sm text-gray-900 font-light px-4 py-3 whitespace-nowrap sm:px-6'>
								{user.status ? (
									<FaCircle className='h-1.5 w-1.5 mr-2 text-vibrant_green' />
								) : (
									<FaCircle className='h-1.5 w-1.5 mr-2 text-vibrant_red' />
								)}
								<select
									className='text-sm text-gray-900 w-full p-2 rounded outline-none'
									value={user.status.toString()}
									onChange={(e) =>
										handleChangeUserStatus(user.id, e.target.value)
									}>
									<option className='rounded' value='true'>
										Activo
									</option>
									<option className='rounded' value='false'>
										Inactivo
									</option>
								</select>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
