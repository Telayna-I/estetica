import { getAllUsers } from "@/actions";
import { Title } from "@/app/components";
import { auth } from "@/auth.config";
import DateTimeDisplay from "@/components/ui/colck/DateTimeDisplay";
import { redirect } from "next/navigation";
import { UsersTable } from "./ui/UsersTable";

export default async function UsersPage() {
	// const session = await auth();

	const { users } = await getAllUsers();

	// if (session?.user.role !== "doctor") {
	// 	redirect("/turnos");
	// }

	return (
		<>
			<div className='flex flex-col sm:flex-row justify-between items-center mt-8 mb-5 px-4 sm:px-6'>
				<Title title={"Usuarios"} />
				<DateTimeDisplay className='mt-2 sm:mt-0' />
			</div>
			<div className='flex flex-col w-full'>
				<UsersTable users={users} />
			</div>
		</>
	);
}
