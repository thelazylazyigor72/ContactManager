import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BiMoon, BiSun } from "react-icons/bi";
import getThemeTagFromLocalStorage from "../utils/getThemeFromLS";
import motionSettings from "../utils/motionSettings";

const ThemeSwitcher = () => {
	// initially getting a theme definer
	const [lightMode, setLightMode] = useState(getThemeTagFromLocalStorage());

	// on any theme definer change we define theme via tailwind rules
	useEffect(() => {
		if (lightMode) {
			document.documentElement.classList.remove("dark");
			document.body.classList.remove("darkMode");
		} else {
			document.documentElement.classList.add("dark");
			document.body.classList.add("darkMode");
		}
	}, [lightMode]);

	// any time theme definer changes we need to store it in localstorage
	// to keep it safe away from reloading
	useEffect(() => {
		localStorage.setItem("themeTag", lightMode);
	}, [lightMode]);

	return (
		<motion.button
			whileTap={{ scale: 0.9 }}
			whileHover={{ scale: 1.1 }}
			transition={motionSettings}
			className="fixed bottom-4 left-4 z-50 rounded-half border-[1.5px] border-solid border-day_text p-2 text-lg text-day_text active:border-day_primary active:text-day_primary dark:border-night_text dark:text-night_text dark:active:border-night_primary dark:active:text-night_primary md:text-2xl lg:bottom-8 lg:left-8 lg:text-4xl 2xl:text-5xl"
			type="submit"
			onClick={() => {
				setLightMode(!lightMode);
			}}
		>
			{lightMode ? <BiMoon /> : <BiSun />}
		</motion.button>
	);
};

export default ThemeSwitcher;
