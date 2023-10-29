import React from "react";
import { usePagination, DOTS } from "../utils/usePagination";

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

	const lastPage = paginationRange[paginationRange.length - 1];
	return (
		<ul className={className}>
			<li
				className={currentPage === 1 ? "pointer-events-none" : ""}
				onClick={handlePrevPage}
			>
				<button
					type="button"
					className="mr-1 bg-night_accent px-2 py-1 text-day_text"
				>
					L
				</button>
			</li>
			{paginationRange.map((pageNumber) => {
				if (pageNumber === DOTS) {
					return (
						<li className="border border-solid border-slate-900 bg-slate-400 p-1">
							...
						</li>
					);
				}

				return (
					<li
						className={`border border-solid border-slate-900 bg-slate-400 p-1 ${
							pageNumber === currentPage ? "text-red-700" : ""
						}`}
						onClick={() => handleSetPage(pageNumber)}
					>
						{pageNumber}
					</li>
				);
			})}
			<li
				className={currentPage === lastPage ? "pointer-events-none" : ""}
				onClick={handleNextPage}
			>
				<button
					type="button"
					className="ml-1 bg-night_accent px-2 py-1 text-day_text"
				>
					R
				</button>
			</li>
		</ul>
	);
};

export default Pagination;
