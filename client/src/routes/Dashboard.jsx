import React from "react";
import { useLoaderData } from "react-router-dom";
import PageTransitioner from "../components/PageTransitioner";
import { useAuthContext } from "../authContext";

export async function loader({ params }) {
	// try {

	// } catch (error) {
	// 	console.log(error);
	// }
	const response = await fetch("http://localhost:8082/api/getAllContacts", {
		method: "GET",
		credentials: "include",
	});
	const data = await response.json();

	return data;
}

const Dashboard = () => {
	const {
		data: { contacts },
	} = useLoaderData();
	return (
		<PageTransitioner>
			<div className="h-full max-h-fit min-h-screen w-full p-2 fx_col-center_center lg:h-screen lg:px-12 lg:pb-10 lg:pt-16">
				<h1>Hello in Dashboard</h1>
				<ul>
					{contacts?.length === 0
						? "Sorry, still empty"
						: contacts?.map((contact) => contact.username)}
				</ul>
			</div>
		</PageTransitioner>
	);
};

export default Dashboard;
