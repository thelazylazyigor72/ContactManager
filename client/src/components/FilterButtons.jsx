import React, { memo } from "react";
import { motion as m } from "framer-motion";

// memoized set of btns
const FilterButtons = memo(function FilterButtons({
	btnsArray,
	filterHandler,
}) {
	return (
		<m.div
			initial={{ x: 100, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ delay: 0.75 }}
			className="hidden gap-x-4 md:gap-x-1 md:fx-center_center lg:gap-x-4"
		>
			{btnsArray.map((group) => {
				return (
					<m.button
						whileTap={{ scale: 0.9 }}
						whileHover={{ scale: 1.1 }}
						transition={{
							type: "spring",
							stiffness: 1000,
							damping: 13,
							bounce: 1,
						}}
						key={group.length}
						className="rounded-md border-l border-t border-solid border-day_text p-1 font-prompt text-lg font-normal text-day_text dark:border-night_accent dark:text-night_accent 3xl:text-xl"
						type="button"
						onClick={() => filterHandler(group)}
					>
						{!group ? "no group" : group}
					</m.button>
				);
			})}
		</m.div>
	);
});

export default FilterButtons;
