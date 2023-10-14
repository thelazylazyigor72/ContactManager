import React, { memo } from "react";
import { motion } from "framer-motion";
import motionSettings from "../utils/motionSettings";

// memoize it, i thought since i have N of this
// components all around the app
// it could be useful to create memoized
// todo может немного прыгающую анимацю сделать
const Button = memo(function Button({ text, handler }) {
	// console.log(`render ${text}`);
	return (
		<motion.button
			whileTap={{ scale: 0.9 }}
			whileHover={{ scale: 1.1 }}
			transition={motionSettings}
			onClick={handler}
			className="rounded-lg bg-gradient-to-r from-day_primary to-day_accent px-7 py-2.5 text-center font-prompt text-lg font-light text-night_text hover:bg-gradient-to-br focus:outline-none active:bg-gradient-to-bl xl:text-xl 2xl:text-3xl"
			type="button"
		>
			{text}
		</motion.button>
	);
});

export default Button;
