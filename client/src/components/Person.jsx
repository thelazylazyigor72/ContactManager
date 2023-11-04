import React from "react";
import { motion as m } from "framer-motion";
import { BsPersonFill } from "react-icons/bs";

const Person = ({ contact }) => {
	return (
		<m.div
			whileTap={{ scale: 0.9 }}
			whileHover={{ scale: 1.1 }}
			transition={{
				type: "spring",
				stiffness: 1000,
				damping: 13,
				bounce: 1,
			}}
			type="button"
			className="relative max-h-32 w-56 rounded-lg bg-slate-100 p-2 shadow-claymorph fx-center_center md:w-60 md:p-3 lg:h-32 lg:p-4"
		>
			<div className="mr-4 hidden w-5/12 md:block">
				<BsPersonFill className=" h-full w-full rounded-half border-[2px] border-solid border-day_text text-day_text" />
			</div>
			<div className="w-7/12 fx_col-center_start">
				<h6 className="font-kanit text-lg underline 3xl:text-xl">
					{contact.name}
				</h6>
				<p className="font-prompt text-base font-thin 3xl:text-lg">
					{contact.group ? contact.group : "..."}
				</p>
			</div>
		</m.div>
	);
};

export default Person;
