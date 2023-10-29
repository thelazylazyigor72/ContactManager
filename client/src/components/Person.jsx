import React from "react";
import { BsPersonFill, BsPencilFill, BsTrashFill } from "react-icons/bs";

const Person = ({ contact }) => {
	return (
		<button
			type="button"
			className="shadow-claymorph relative max-h-32 w-56 rounded-lg bg-slate-100 p-4 fx-center_center lg:h-32"
		>
			<div className="mr-4 hidden w-5/12 md:block">
				<BsPersonFill className=" h-full w-full rounded-half border-[2px] border-solid border-day_text text-day_text" />
			</div>
			<div className="w-7/12 fx_col-center_start">
				<h6 className="font-kanit text-lg underline">{contact.name}</h6>
				<p className="font-prompt text-base font-thin">
					{contact.group ? contact.group : "..."}
				</p>
			</div>
			<button
				className="absolute right-4 top-4 rounded-half border border-solid border-day_text p-1"
				type="button"
			>
				<BsPencilFill />
			</button>
			<button
				className="absolute bottom-4 right-4 rounded-half border border-solid border-day_text p-1"
				type="button"
			>
				<BsTrashFill />
			</button>
		</button>
	);
};

export default Person;
