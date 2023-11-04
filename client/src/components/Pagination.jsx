import React from "react";
import { motion as m } from "framer-motion";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { usePagination, DOTS } from "../utils/usePagination";

// *doesnt memoized
// cuz its pointless

const Pagination = (props) => {
	const {
		handleNextPage,
		handlePrevPage,
		handleSetPage,
		totalCount,
		siblingCount = 0,
		currentPage,
		pageSize,
		className,
	} = props;

	// call a custom hook
	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	});

	// If there are less than 2 times in pagination range we shall not render the component
	if (currentPage === 0 || paginationRange?.length < 2) {
		return null;
	}

	// calc last page number
	const lastPage = paginationRange[paginationRange.length - 1];
	return (
		<m.ul
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			transition={{ delay: 0.75 }}
			className={className}
		>
			<m.li
				whileTap={{ scale: 0.9 }}
				whileHover={{ scale: 1.1 }}
				transition={{
					type: "spring",
					stiffness: 1000,
					damping: 13,
					bounce: 1,
				}}
				className={currentPage === 1 ? "pointer-events-none" : ""}
				onClick={handlePrevPage}
			>
				<button
					type="button"
					className="rounded-lg border border-solid border-day_accent bg-day_primary p-1 text-2xl text-day_text hover:bg-night_accent active:bg-day_accent dark:border-night_accent"
				>
					<AiOutlineLeft />
				</button>
			</m.li>
			{paginationRange.map((pageNumber, index) => {
				if (pageNumber === DOTS) {
					return (
						<li
							/* eslint-disable */
							key={index}
							className="pointer-events-none rounded-lg bg-day_primary p-1 font-prompt font-bold text-day_text"
						>
							...
						</li>
					);
				}

				return (
					<m.li
						key={index}
						whileTap={{ scale: 0.9 }}
						whileHover={{ scale: 1.1 }}
						transition={{
							type: "spring",
							stiffness: 1000,
							damping: 13,
							bounce: 1,
						}}
						className={`cursor-pointer rounded-lg bg-day_primary p-1 font-prompt text-lg font-bold text-day_text ${
							pageNumber === currentPage
								? "border-[2px] border-solid border-night_accent bg-transparent dark:text-night_text"
								: ""
						}`}
						onClick={() => handleSetPage(pageNumber)}
					>
						{pageNumber}
					</m.li>
				);
			})}
			<m.li
				whileTap={{ scale: 0.9 }}
				whileHover={{ scale: 1.1 }}
				transition={{
					type: "spring",
					stiffness: 1000,
					damping: 13,
					bounce: 1,
				}}
				className={currentPage === lastPage ? "pointer-events-none" : ""}
				onClick={handleNextPage}
			>
				<button
					type="button"
					className="rounded-lg border border-solid border-day_accent bg-day_primary p-1 text-2xl text-day_text hover:bg-night_accent active:bg-day_accent dark:border-night_accent"
				>
					<AiOutlineRight />
				</button>
			</m.li>
		</m.ul>
	);
};

export default Pagination;
