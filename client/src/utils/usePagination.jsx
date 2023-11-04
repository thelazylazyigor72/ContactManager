import React, { useMemo } from "react";

// just var to define dots :)
export const DOTS = "...";

const range = (start, end) => {
	const length = end - start + 1;
	// create an array of certain len
	// and set the elements within it
	return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
	totalCount,
	pageSize,
	siblingCount = 1,
	currentPage,
}) => {
	const paginationRange = useMemo(() => {
		// total amount of pages, to bigger int
		const totalPageCount = Math.ceil(totalCount / pageSize);

		// num of btns to display, 5 cuz of
		// siblingCount + firstPage + lastPage + currentPage + 2*dots
		const totalPageNumbers = siblingCount + 5;

		// !case1 - if num of pages less than num of btns
		// return interval from 1 to totalPageCOunt
		if (totalPageNumbers >= totalPageCount) {
			return range(1, totalPageCount);
		}

		// calc left&right indexs from current
		// to make sure theyre within appropriate range
		const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
		const rightSiblingIndex = Math.min(
			currentPage + siblingCount,
			totalPageCount,
		);

		// dont show ... incase when
		// between left/right border and neighboor of crnt btn
		const shouldShowLeftDots = leftSiblingIndex > 2;
		const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

		const firstPageIndex = 1;
		const lastPageIndex = totalPageCount;

		// !case2 - left has no dots,right has
		if (!shouldShowLeftDots && shouldShowRightDots) {
			const leftItemCount = 3 + 2 * siblingCount;
			const leftRange = range(1, leftItemCount);

			return [...leftRange, DOTS, totalPageCount];
		}

		// !case3 - reverse case2
		if (shouldShowLeftDots && !shouldShowRightDots) {
			const rightItemCount = 3 + 2 * siblingCount;
			const rightRange = range(
				totalPageCount - rightItemCount + 1,
				totalPageCount,
			);
			return [firstPageIndex, DOTS, ...rightRange];
		}

		// !case4 left/right have dots
		if (shouldShowLeftDots && shouldShowRightDots) {
			const middleRange = range(leftSiblingIndex, rightSiblingIndex);
			return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
		}

		return null;
	}, [totalCount, pageSize, siblingCount, currentPage]);

	return paginationRange;
};
