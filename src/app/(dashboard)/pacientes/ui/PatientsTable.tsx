export const PatientsTable = () => {
	return (
		<table className=' m-auto mt-20 w-11/12'>
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
				<tr
					key={"user.id"}
					className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'>
					<td className='px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900'>
						{"Leandro Magnaterra"}
					</td>
					<td className='text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap'>
						{"2932 534436"}
					</td>
					<td className='flex underline cursor-pointer items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
						{"Ver ficha"}
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
					</td>
				</tr>
				{/* {users.map((user) => (
					<tr
						key={user.id}
						className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'>
						<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
							{user.email}
						</td>
						<td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
							{user.name}
						</td>
						<td className='flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
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
						</td>
					</tr>
				))} */}
			</tbody>
		</table>
	);
};
