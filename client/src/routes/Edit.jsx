import React, { useEffect, useId, useReducer } from "react";
import {
	useLoaderData,
	useNavigate,
	useLocation,
	useNavigation,
} from "react-router-dom";
import { motion as m } from "framer-motion";
import PageTransitioner from "../components/PageTransitioner";
import Loading from "../components/Loading";
import { reducer } from "../utils/editReducer";

export async function loader() {
	// loader specifically for a creation
	const data = {
		success: true,
		message: "",
		errorMessage: "",
		data: {
			name: "",
			phoneNumber: "",
			group: "",
		},
	};
	return data;
}

const Edit = () => {
	const navigation = useNavigation();
	const navigate = useNavigate();
	// get loader data
	const {
		data: { name, group, phoneNumber },
	} = useLoaderData();

	// get state that was passed w/ Link component
	const { state } = useLocation();

	// initial state should be created from scratch
	const [formState, dispatch] = useReducer(reducer, {
		name,
		phoneNumber,
		group,
		errorMessage: "",
		error: false,
	});

	// ids
	const id = useId();
	const nameId = `${id}-name`;
	const phoneNumberId = `${id}-phoneNumber`;
	const groupId = `${id}-group`;

	// protection
	useEffect(() => {
		if (!state) navigate("/dashboard");
	}, [state, navigate]);

	const handleSubmit = async () => {
		try {
			// validations
			if (!formState.name || !formState.phoneNumber) {
				throw new Error("Name and number fields required");
			}
			if (formState.name.length < 3 || formState.name.length > 26) {
				throw new Error("Name length should be more than 3 and less than 26");
			}
			if (
				formState.phoneNumber.length < 11 ||
				formState.phoneNumber.length > 15
			) {
				throw new Error(
					"Phone number length should be more than 11 and less than 15",
				);
			}
			const body = {
				name: formState.name,
				phoneNumber: formState.phoneNumber,
				group: formState.group,
			};
			// fetch call created dynamically
			const response = await fetch(state.requestURL, {
				method: state.requestMethod,
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});
			const data = await response.json();
			// also dynamic logic on success/error
			if (data.success) {
				navigate(state.redirectURL);
			} else {
				throw new Error(data.errorMessage);
			}
		} catch (error) {
			dispatch({ type: "SET_ERROR", payload: error.message });
		}
	};

	if (navigation.state === "loading") {
		return <Loading size="screen" />;
	}

	return (
		<PageTransitioner>
			<div className="h-full max-h-fit min-h-screen w-full overflow-hidden p-2 pb-10 pt-16 fx_col-center_center lg:h-screen lg:px-12 lg:pb-10 lg:pt-16">
				<form
					method="post"
					id="contact-form"
					className="w-full gap-4 rounded-xl border border-solid border-day_accent bg-day_primary p-4 fx_col-center_start dark:bg-night_primary  md:w-9/12 lg:w-7/12 lg:px-20 lg:py-14 2xl:w-6/12"
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit(e);
					}}
				>
					{formState.error && (
						<m.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{
								duration: 0.35,
								ease: "easeInOut",
							}}
							className="w-full"
						>
							<p className="mb-4 w-full rounded-lg bg-red-600 p-1 text-center font-kanit text-lg font-medium text-day_text">
								{formState.errorMessage}
							</p>
						</m.div>
					)}
					<div className="w-full">
						<label
							htmlFor={nameId}
							className="mb-1 font-kanit text-lg font-normal uppercase "
						>
							Name
						</label>
						<input
							type="text"
							id={nameId}
							name={nameId}
							value={formState.name}
							className="block w-full rounded-lg border border-solid border-day_accent bg-day_text p-2.5 font-kanit text-base font-light text-night_text dark:border-night_accent dark:bg-night_text dark:text-day_text dark:placeholder-gray-400"
							onChange={(e) => {
								dispatch({
									type: "INPUT_CHANGE",
									payload: {
										key: "name",
										value: e.target.value,
									},
								});
							}}
						/>
					</div>
					<div className="w-full">
						<label
							htmlFor={phoneNumberId}
							className="mb-1 font-kanit text-lg font-normal uppercase "
						>
							phoneNumber
						</label>
						<input
							type="tel"
							id={phoneNumberId}
							name={phoneNumberId}
							value={formState.phoneNumber}
							className="block w-full rounded-lg border border-solid border-day_accent bg-day_text p-2.5 font-kanit text-base font-light text-night_text dark:border-night_accent dark:bg-night_text dark:text-day_text dark:placeholder-gray-400"
							onChange={(e) => {
								dispatch({
									type: "INPUT_CHANGE",
									payload: {
										key: "phoneNumber",
										value: e.target.value,
									},
								});
							}}
						/>
					</div>
					<div className="w-full">
						<label
							htmlFor={groupId}
							className="mb-1 font-kanit text-lg font-normal uppercase "
						>
							Select an option
						</label>
						<select
							id={groupId}
							name={groupId}
							value={formState.group}
							onChange={(e) => {
								dispatch({
									type: "INPUT_CHANGE",
									payload: {
										key: "group",
										value: e.target.value,
									},
								});
							}}
							className="block w-full rounded-lg border border-solid border-day_accent bg-day_text p-2.5 font-kanit text-base font-light text-night_text dark:border-night_accent dark:bg-night_text dark:text-day_text dark:placeholder-gray-400"
						>
							<option value="none">none</option>
							<option value="family">family</option>
							<option value="friends">friends</option>
							<option value="collegues">collegues</option>
						</select>
					</div>
					<div className="mt-4 w-full gap-1 fx-between_center">
						<m.button
							whileTap={{ scale: 0.9 }}
							whileHover={{ scale: 1.05 }}
							transition={{
								type: "spring",
								stiffness: 1000,
								damping: 13,
								bounce: 1,
							}}
							className="mb-2 mr-2 rounded-lg border-[2px] border-solid border-day_text px-5 py-2.5 text-center font-kanit text-lg font-medium text-day_text hover:bg-night_background hover:text-night_text focus:outline-none focus:ring-4 active:bg-transparent active:text-day_text dark:hover:text-white  dark:active:text-day_text"
							type="submit"
						>
							Save
						</m.button>
						<m.button
							whileTap={{ scale: 0.9 }}
							whileHover={{ scale: 1.05 }}
							transition={{
								type: "spring",
								stiffness: 1000,
								damping: 13,
								bounce: 1,
							}}
							className="mb-2 mr-2 rounded-lg border-[2px] border-solid border-day_text px-5 py-2.5 text-center font-kanit text-lg font-medium text-day_text hover:bg-night_background hover:text-night_text focus:outline-none focus:ring-4 active:bg-transparent active:text-day_text dark:hover:text-white  dark:active:text-day_text"
							type="button"
							onClick={() => {
								navigate(-1);
							}}
						>
							Cancel
						</m.button>
					</div>
				</form>
			</div>
		</PageTransitioner>
	);
};

export default Edit;
