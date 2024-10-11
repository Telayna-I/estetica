"use client";

import { changeUserRole, changeUserStatus } from "@/actions";
import { User } from "@prisma/client";
import { FaCircle } from "react-icons/fa";

interface Props {
	users: User[];
}

export const UsersTable = ({ users }: Props) => {
	return (
		<table className=' m-auto mt-3 w-full'>
			<thead className='bg-gray-200 border-b'>
				<tr>
					<th
						scope='col'
						className='text-sm font-medium text-gray-900 px-6 py-4 text-left '>
						Nombre
					</th>
					<th
						scope='col'
						className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
						Email
					</th>
					<th
						scope='col'
						className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
						Acciones
					</th>
					<th
						scope='col'
						className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
						Estado
					</th>
				</tr>
			</thead>
			<tbody>
				{users?.map((user) => (
					<tr
						key={user.id}
						className='bg-white border-b transition duration-300 ease-in-out hover:bg-indigo-100'>
						<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize'>
							{user.name}
						</td>
						<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
							{user.email}
						</td>
						<td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap '>
							<select
								className='text-sm text-gray-900 w-full p-2 rounded outline-none'
								value={user.role}
								onChange={(e) => changeUserRole(user.id, e.target.value)}>
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

						<td className='flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
							{user.status ? (
								<FaCircle className='h-1.5 w-1.5 mr-2 text-vibrant_green' />
							) : (
								<FaCircle className='h-1.5 w-1.5 mr-2 text-vibrant_red' />
							)}
							<select
								className='text-sm text-gray-900 w-full p-2 rounded outline-none'
								value={user.status.toString()}
								onChange={(e) => changeUserStatus(user.id, e.target.value)}>
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
	);
};
