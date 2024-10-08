import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				principal: "#F5F5F5",
				superficies: "#E0E0E0",
				primary_text: "#222222",
				secondary_text: "#555555",
				color_border: "#A9A9A9",
				rosa_vibrante: "#FF3366",
				foreground: "var(--foreground)",
				violet_form: "#E6F1FE",
				violet_button: "#7828C8",
				dorado: "#F1E5AC",
				title: "#6A1B9A",
			},
		},
	},
	darkMode: "class",
};
export default config;
