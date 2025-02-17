/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,ts}"],
	theme: {
		extend: {
			fontFamily: {
				montserrat: "var(--font-montserrat)",
				poppins: "var(--font-poppins)"
			},
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				accent: "var(--accent)",
				primary: "var(--primary)",
				secondary: "var(--secondary)",
				danger: "var(--danger)",
				gray: "var(--gray)",
				"light-gray": "var(--light-gray)",
				surface: "var(--surface)"
			}
		}
	},
	plugins: []
};
