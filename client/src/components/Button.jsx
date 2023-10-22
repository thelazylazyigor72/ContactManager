import React, { memo } from "react";
import { motion } from "framer-motion";

// memoize it, i thought since i have N of this
// components all around the app
// it could be useful to create memoized one
const Button = memo(function Button({ text, handler }) {
	return (
		<motion.button
			initial={{
				scale: 1,
				opacity: 0,
				x: 75,
				rotate: 0,
				transition: { ease: "easeIn", duration: 0.5, delay: 0.5 },
			}}
			animate={{
				scale: 1,
				opacity: 1,
				x: 0,
				rotate: 0,
				transition: { ease: "easeIn", duration: 0.5, delay: 0.5 },
			}}
			whileTap={{ scale: 0.9 }}
			whileHover={{ scale: 1.1 }}
			transition={{
				type: "spring",
				stiffness: 1000,
				damping: 13,
				bounce: 1,
			}}
			onClick={handler}
			className="rounded-lg bg-gradient-to-r from-day_primary to-day_accent px-7 py-2.5 text-center font-prompt text-lg font-light text-night_text hover:bg-gradient-to-br focus:outline-none active:bg-gradient-to-t active:from-night_primary active:to-night_primary active:text-day_text dark:active:bg-gradient-to-t dark:active:from-day_primary dark:active:to-day_primary dark:active:text-day_text xl:text-xl 2xl:text-3xl"
			type="button"
		>
			{text}
		</motion.button>
	);
});

export default Button;
