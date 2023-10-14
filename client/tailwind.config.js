/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "class",
	theme: {
		fontFamily: {
			kanit: ["Kanit", "sans-serif"],
			prompt: ["Prompt", "sans-serif"],
		},
		extend: {
			borderRadius: {
				"4xl": "2rem",
				half: "50%",
			},
			spacing: {
				128: "32rem",
				144: "36rem",
			},
			screens: {
				xs: "550px",
				"3xl": "1920px",
			},
			colors: {
				night_text: "#e8fff3",
				night_background: "#181818",
				night_primary: "#72dfa6",
				night_secondary: "#082114",
				night_accent: "#2dc878",
				day_text: "#181818",
				day_background: "#e8fff3",
				day_primary: "#72dfa6",
				day_secondary: "#cef3e0",
				day_accent: "#114b2d",
			},
		},
		flexScheme: {
			between_center: ["space-between", "center"],
			between_start: ["space-between", "flex-start"],
			between_end: ["space-between", "flex-end"],
			between_baseline: ["space-between", "baseline"],
			between_stretch: ["space-between", "stretch"],

			evenly_center: ["space-evenly", "center"],
			evenly_start: ["space-evenly", "flex-start"],
			evenly_end: ["space-evenly", "flex-end"],
			evenly_baseline: ["space-evenly", "baseline"],
			evenly_stretch: ["space-evenly", "stretch"],

			center_center: ["center", "center"],
			center_start: ["center", "flex-start"],
			center_end: ["center", "flex-end"],
			center_baseline: ["center", "baseline"],
			center_stretch: ["center", "stretch"],

			start_center: ["flex-start", "center"],
			start_start: ["flex-start", "flex-start"],
			start_end: ["flex-start", "flex-end"],
			start_baseline: ["flex-start", "baseline"],
			start_stretch: ["flex-start", "stretch"],

			end_center: ["flex-end", "center"],
			end_start: ["flex-end", "flex-start"],
			end_end: ["flex-end", "flex-end"],
			end_baseline: ["flex-end", "baseline"],
			end_stretch: ["flex-end", "stretch"],
		},
	},
	plugins: [
		plugin(function ({ matchUtilities, theme }) {
			matchUtilities(
				{
					fx: (value) => ({
						display: "flex",
						flexDirection: "row",
						justifyContent: value[0],
						alignItems: value[1],
					}),
					fx_col: (value) => ({
						display: "flex",
						flexDirection: "column",
						justifyContent: value[0],
						alignItems: value[1],
					}),
					fx_re: (value) => ({
						display: `flex`,
						flexDirection: "row-reverse",
						justifyContent: value[0],
						alignItems: value[1],
					}),
					fx_re_col: (value) => ({
						display: "flex",
						flexDirection: "column-reverse",
						justifyContent: value[0],
						alignItems: value[1],
					}),
				},
				{ values: theme("flexScheme") },
			);
		}),
	],
};
