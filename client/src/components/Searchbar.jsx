import React, { useId, memo } from "react";
import { motion as m } from "framer-motion";
import { BiSearch } from "react-icons/bi";

const Searchbar = memo(function Searchbar({ inputValue, inputHandler }) {
	const id = useId();
	return (
		<m.div
			initial={{ x: "-100%", opacity: 0 }}
			animate={{ x: "0", opacity: 1 }}
			transition={{ delay: 0.75 }}
			className="group relative z-0 mb-6 w-full border-b  border-solid border-day_text dark:border-night_accent md:w-fit lg:px-12"
		>
			<input
				type="text"
				name={id}
				id={id}
				value={inputValue}
				className="peer block w-full appearance-none border-0 border-b-2 border-day_text bg-transparent px-0 py-2.5 font-prompt text-sm text-day_text focus:outline-none focus:ring-0 dark:border-night_text dark:text-night_text 3xl:text-lg"
				placeholder=" "
				onChange={(e) => {
					inputHandler(e);
				}}
			/>
			<label
				htmlFor={id}
				className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform gap-1 font-prompt text-base uppercase text-day_text duration-300 fx-center_center peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-light dark:text-night_accent 3xl:text-xl"
			>
				<BiSearch /> Search contacts
			</label>
		</m.div>
	);
});

export default Searchbar;
