import { inter } from "@/config/fonts";
import "./globals.css";
import { Provider } from "@/components";
import { Toaster } from "sonner";

export const metadata = {
	title: "Centro de Estetica ",
	description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='es'>
			<body className={inter.className}>
				<Provider>
					{children} <Toaster richColors />
				</Provider>
			</body>
		</html>
	);
}
