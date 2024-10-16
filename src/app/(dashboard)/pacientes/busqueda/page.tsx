"use client";

import { Title } from "@/app/components";
import { ButtonOutline } from "@/app/components/button/ButtonOutline";
import { SearchBar } from "@/components/ui";
import DateTimeDisplay from "@/components/ui/colck/DateTimeDisplay";
import { useSearchStore } from "@/store";
import Link from "next/link";

export default function FilteredPatientsPage() {
	const searchResults = useSearchStore((state) => state.searchResults);

	return (
		<>
			<div className='flex justify-between items-center mt-8 mb-5'>
				<Title title={"Listado de pacientes."} />
				<DateTimeDisplay className='mt-2' />
			</div>
			<div className='flex flex-col'>
				<Link href={"/pacientes/nuevo-paciente"} className='self-end'>
					<ButtonOutline label='Nuevo paciente' />
				</Link>
				<SearchBar />
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
								Telefono
							</th>
							<th
								scope='col'
								className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
								Acciones
							</th>
						</tr>
					</thead>
					<tbody>
						{/* <tr
							key={"user.id"}
							className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'>
							<td className='px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900'>
								{"Leandro Magnaterra"}
							</td>
							<td className='text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap'>
								{"2932 534436"}
							</td>
							<td className='flex underline cursor-pointer items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap'> */}
						{/* {"Ver ficha"} */}
						{/* <select
						className='text-sm text-gray-900 w-full p-2 rounded outline-none'
						value={'user.role'}
						onChange={(e) => changeUserRole(user.id, e.target.value)}>
						<option className='rounded' value='admin'>
							Admin
						</option>
						<option className='rounded' value='user'>
							User
						</option>
					</select> */}
						{/* </td> */}
						{/* </tr> */}
						{searchResults.map((patient) => (
							<tr
								key={patient.id}
								className='bg-white border-b transition duration-300 ease-in-out hover:bg-indigo-100'>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize'>
									{patient.name}
								</td>
								<td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
									{patient.phone}
								</td>
								<td className='flex underline cursor-pointer items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
									<Link
										className='font-medium text-blue-600 underline'
										href={`/pacientes/${patient.id}`}>
										Ver ficha
									</Link>
								</td>
								{/* <td className='flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
									<select
										className='text-sm text-gray-900 w-full p-2 rounded outline-none'
										value={user.role}
										onChange={(e) => changeUserRole(user.id, e.target.value)}>
										<option className='rounded' value='admin'>
											Admin
										</option>
										<option className='rounded' value='user'>
											User
										</option>
									</select>
								</td> */}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
