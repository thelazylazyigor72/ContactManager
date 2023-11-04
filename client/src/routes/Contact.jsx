import React from "react";
import {
	useLoaderData,
	Form,
	Link,
	useNavigate,
	useNavigation,
} from "react-router-dom";
import { motion as m } from "framer-motion";
import PageTransitioner from "../components/PageTransitioner";
import Loading from "../components/Loading";

export async function loader({ params }) {
	const response = await fetch(
		`http://localhost:${process.env.REACT_APP_PORT}/api/contact/${params.contactId}`,
		{
			method: "GET",
			credentials: "include",
		},
	);
	const data = await response.json();
	if (data.errorMessage) throw new Error(data.errorMessage);
	return data;
}

const Contact = () => {
	const navigation = useNavigation();
	const navigate = useNavigate();

	// get data from loader
	const {
		data: { _id, name, group, phoneNumber },
	} = useLoaderData();

	if (navigation.state === "loading") {
		return <Loading size="screen" />;
	}

	return (
		<PageTransitioner>
			<div className="h-full max-h-fit min-h-screen w-full p-2 pt-16 fx_col-center_center lg:h-screen lg:px-12 lg:pb-10">
				<div className="h-auto w-full gap-4 rounded-xl bg-transparent p-6 shadow-greenmorph fx_col-between_start md:w-8/12 md:p-12 lg:w-6/12 3xl:w-4/12">
					<div className="w-full fx-between_center">
						<h1 className="break-words font-kanit text-4xl font-bold text-day_text dark:text-night_text md:text-5xl">
							{name}
						</h1>
						<m.button
							whileTap={{ scale: 0.9 }}
							whileHover={{ scale: 1.1 }}
							transition={{
								type: "spring",
								stiffness: 1000,
								damping: 13,
								bounce: 1,
							}}
							type="button"
							className="uppercases rounded-lg bg-day_primary px-6 py-2 font-kanit text-lg uppercase dark:bg-night_primary"
							onClick={() => navigate("/dashboard")}
						>
							Back
						</m.button>
					</div>
					<h2 className="font-prompt text-2xl font-normal text-day_text dark:text-night_text">
						{phoneNumber}
					</h2>
					{group && (
						<p className="w-fit rounded-xl font-prompt text-2xl font-light text-day_text dark:text-night_text">
							{group}
						</p>
					)}
					<div className="w-full gap-6 fx-between_center md:fx-start_center">
						<m.div
							whileTap={{ scale: 0.9 }}
							whileHover={{ scale: 1.1 }}
							transition={{
								type: "spring",
								stiffness: 1000,
								damping: 13,
								bounce: 1,
							}}
						>
							<Link
								to={`/dashboard/contact/${_id}/edit`}
								state={{
									requestURL: `http://localhost:${process.env.REACT_APP_PORT}/api/contact/${_id}`,
									requestMethod: "PUT",
									redirectURL: `/dashboard/contact/${_id}`,
								}}
							>
								<button
									className=" rounded-lg bg-day_primary px-6 py-2 font-kanit text-lg uppercase dark:bg-night_primary"
									type="button"
								>
									Edit
								</button>
							</Link>
						</m.div>
						<m.div
							whileTap={{ scale: 0.9 }}
							whileHover={{ scale: 1.1 }}
							transition={{
								type: "spring",
								stiffness: 1000,
								damping: 13,
								bounce: 1,
							}}
						>
							<Form
								method="post"
								action="delete"
								onSubmit={(e) => {
									/* eslint-disable */
									if (
										!confirm("Please confirm you want to delete this record.")
									) {
										e.preventDefault();
									}
								}}
							>
								<button
									className="rounded-lg bg-day_primary px-6 py-2 font-kanit text-lg uppercase dark:bg-night_primary"
									type="submit"
								>
									Delete
								</button>
							</Form>
						</m.div>
					</div>
				</div>
			</div>
		</PageTransitioner>
	);
};

export default Contact;
