import React, { memo, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

// its not like im gonna always make it memoized
// but the base to make it possible
// i mean, fe on Index page its not
// needed, but maybe...
const Appearance = memo(function Appearance({
	children,
	width = "fit-content",
}) {
	console.log("Appearance");
	// ref
	const ref = useRef(null);
	// is passed ref in viewport
	// and i need to toggle flag only once
	const inView = useInView(ref, { once: true });
	// create obvious controller
	const contentController = useAnimation();
	useEffect(() => {
		// if in viewport then start animation
		if (inView) {
			contentController.start("target");
		}
	}, [inView, contentController]);

	return (
		<div ref={ref} className={`${width} relative overflow-hidden`}>
			<motion.div
				variants={{
					initial: { opacity: 0, y: 75 },
					target: { opacity: 1, y: 0 },
				}}
				initial="initial"
				animate={contentController}
				transition={{
					duration: 0.5,
					delay: 0.2,
				}}
			>
				{children}
			</motion.div>
		</div>
	);
});

export default Appearance;
