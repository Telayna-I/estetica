import { getPaginatedPatients } from "@/actions";
import { Title } from "@/app/components";
import { ButtonOutline } from "@/app/components/button/ButtonOutline";
import { Pagination, SearchBar } from "@/components/ui";
import DateTimeDisplay from "@/components/ui/colck/DateTimeDisplay";
import Link from "next/link";

import { redirect } from "next/navigation";

interface Props {
	searchParams: {
		page?: string;
	};
}

export default async function PatientsPage({ searchParams }: Props) {
	const page = searchParams.page ? parseInt(searchParams.page) : 1;
	const { ok, patients, totalPages } = await getPaginatedPatients({ page });

	if (!ok) {
		redirect("/auth/login");
	}

	return (
		<>
			<div className='flex flex-col md:flex-row justify-between items-start mt-8 mb-5'>
				<div className='mb-4 md:mb-0'>
					<Title title={"Listado de pacientes."} />
				</div>
				<DateTimeDisplay className='mt-2' />
			</div>
			<div className='flex flex-col'>
				<Link href={"/pacientes/nuevo-paciente"} className='self-start mb-4'>
					<ButtonOutline label='Nuevo paciente' />
				</Link>
				<SearchBar />
				<div className='overflow-x-auto mt-3'>
					<table className='m-auto w-full bg-white shadow-md rounded-lg'>
						<thead className='bg-gray-200 border-b'>
							<tr>
								<th
									scope='col'
									className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
									Nombre
								</th>
								<th
									scope='col'
									className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
									Teléfono
								</th>
								<th
									scope='col'
									className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
									Acciones
								</th>
							</tr>
						</thead>
						<tbody>
							{patients.map((patient) => (
								<tr
									key={patient.id}
									className='bg-white border-b transition duration-300 ease-in-out hover:bg-indigo-100'>
									<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize'>
										{patient.name}
									</td>
									<td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
										{patient.phone}
									</td>
									<td className='flex items-center text-sm font-light px-6 py-4 whitespace-nowrap'>
										<Link
											className='font-medium text-blue-600 hover:underline'
											href={`/pacientes/${patient.id}`}>
											Ver ficha
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<Pagination totalPages={totalPages!} />
		</>
	);
}
