import React from "react";
import { useLoaderData, Form, Link } from "react-router-dom";
// todo need backtodashboard button
export async function loader({ request, params }) {
	console.log(request);
	const response = await fetch(
		`http://localhost:8082/api/contact/${params.contactId}`,
		{
			method: "GET",
			credentials: "include",
		},
	);
	const data = await response.json();
	console.log(data);
	if (data.errorMessage) throw new Error(data.errorMessage);
	return data;
}

const Contact = () => {
	const {
		data: { _id, name, group, phoneNumber },
	} = useLoaderData();
	return (
		<div className="h-full max-h-fit min-h-screen w-full p-2 pt-16 fx_col-center_center lg:h-screen lg:px-12 lg:pb-10">
			<div className="h-auto w-5/12 gap-8 rounded-xl bg-slate-100 p-8 shadow-claymorph fx_col-between_start">
				<div className="w-full fx-between_center">
					<div className="font-kanit text-5xl font-bold">{name}</div>
					<div className="w-fit rounded-xl p-4 font-prompt text-base font-extralight uppercase shadow-claymorph">
						{group}
					</div>
				</div>
				<div className="font-prompt text-4xl font-normal">{phoneNumber}</div>
				<div className="w-full fx-between_center">
					<Link
						className="w-fit rounded-xl p-4 font-kanit text-base font-normal capitalize shadow-claymorph"
						to={`/dashboard/contact/${_id}/edit`}
						state={{
							requestURL: `http://localhost:8082/api/contact/${_id}`,
							requestMethod: "PUT",
							redirectURL: `/dashboard/contact/${_id}`,
						}}
					>
						<button type="submit">Edit</button>
					</Link>
					<Form
						className="w-fit rounded-xl p-4 font-kanit text-base font-normal capitalize shadow-claymorph"
						method="post"
						action="delete"
						onSubmit={(e) => {
							/* eslint-disable */
							if (!confirm("Please confirm you want to delete this record.")) {
								e.preventDefault();
							}
						}}
					>
						<button type="submit">Delete</button>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default Contact;
