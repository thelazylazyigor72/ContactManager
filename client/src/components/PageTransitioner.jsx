import React from "react";
import { motion as m } from "framer-motion";

// wrapper to create page transitions
// upd: decided to create a border on top
// to make it more obvious
const PageTransitioner = ({ children }) => {
	return (
		<m.div
			initial={{ y: "100%" }}
			animate={{ y: "0%" }}
			transition={{ duration: 0.75, ease: "easeOut" }}
			exit={{ opacity: 1 }}
			className="border-t-[1px] border-solid border-day_primary dark:border-night_primary"
		>
			{children}
		</m.div>
	);
};

export default PageTransitioner;
