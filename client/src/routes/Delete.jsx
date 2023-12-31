import { redirect } from "react-router-dom";

async function deleteAction({ params }) {
	const response = await fetch(
		`http://localhost:${process.env.REACT_APP_PORT}/api/delete/${params.contactId}`,
		{
			method: "DELETE",
			credentials: "include",
		},
	);
	const data = await response.json();
	if (!data.success) throw new Error(data.errorMessage);
	return redirect("/dashboard");
}

export default deleteAction;
