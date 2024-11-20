import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import SideNavigation from "../components/iaSidebar/NewSidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	// const session = await auth();

	// if (!session?.user) {
	// 	redirect("/auth/login");
	// }

	return (
		<div className='bg-principal overflow-y-scroll antialiased text-slate-300 selection:bg-blue-600 selection:text-white'>
			<div className='flex'>
				<SideNavigation />

				<div className='w-full text-primary_text bg-principal px-5 '>{children}</div>
			</div>
		</div>
	);
}
