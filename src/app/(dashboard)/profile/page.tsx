import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
	const session = await auth();

	if (!session?.user) {
		redirect("/auth/login");
	}

	return (
		<div>
			<pre>{JSON.stringify(session, null, 2)}</pre>
			<pre>{JSON.stringify(session.user)}</pre>
		</div>
	);
}
