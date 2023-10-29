import React, { useMemo } from "react";

export const DOTS = "...";

const range = (start, end) => {
	const length = end - start + 1;
	/*
        Create an array of certain length and set the elements within it from
        start value to end value.
    */
	return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
	totalCount,
	pageSize,
	siblingCount = 1,
	currentPage,
}) => {
	const paginationRange = useMemo(() => {
		// Суммарное количество страниц, с округлением в большую сторону
		const totalPageCount = Math.ceil(totalCount / pageSize);

		// кол-во кнопок страниц для отображения, 5 потому что siblingCount + firstPage + lastPage + currentPage + 2*dots
		const totalPageNumbers = siblingCount + 5;

		// !Случай 1 Если число страниц меньше числа кнопок для отображения
		// возвращаем интервал от 1 до totalPageCount
		if (totalPageNumbers >= totalPageCount) {
			return range(1, totalPageCount);
		}

		/*
            Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
        */
		// Расчет левого и правого индекса, от текущего, соседние кнопки текущей страницы
		// оба должны быть в пределах от 1 до totalPageCount очевидно
		// поэтому левый сравнивается с 1, а правый с Самой последней страницей дефакто
		const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
		const rightSiblingIndex = Math.min(
			currentPage + siblingCount,
			totalPageCount,
		);

		// не показываем многоточие в случае когда между границой справа/слева и соседними от текущей кнопки
		const shouldShowLeftDots = leftSiblingIndex > 2;
		const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

		const firstPageIndex = 1;
		const lastPageIndex = totalPageCount;

		// !Второй случай: слева нет многоточия, справа есть
		if (!shouldShowLeftDots && shouldShowRightDots) {
			const leftItemCount = 3 + 2 * siblingCount;
			const leftRange = range(1, leftItemCount);

			return [...leftRange, DOTS, totalPageCount];
		}

		// !Случай три: слева есть многоточие, справа нет
		if (shouldShowLeftDots && !shouldShowRightDots) {
			const rightItemCount = 3 + 2 * siblingCount;
			const rightRange = range(
				totalPageCount - rightItemCount + 1,
				totalPageCount,
			);
			return [firstPageIndex, DOTS, ...rightRange];
		}

		// !Четвертый: и слева и справа есть многоточия
		if (shouldShowLeftDots && shouldShowRightDots) {
			const middleRange = range(leftSiblingIndex, rightSiblingIndex);
			return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
		}

		return null;
	}, [totalCount, pageSize, siblingCount, currentPage]);

	return paginationRange;
};
