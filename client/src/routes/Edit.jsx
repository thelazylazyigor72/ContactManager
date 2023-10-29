import React, { useId, useReducer } from "react";
import { useLoaderData, useNavigate, useLocation } from "react-router-dom";
import { motion as m } from "framer-motion";
import PageTransitioner from "../components/PageTransitioner";
import { reducer } from "../utils/editReducer";

export async function loader() {
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
	const {
		data: { name, group, phoneNumber },
	} = useLoaderData();
	// ? может сделать что если undefined(case когда напрямую по урлу переходим)
	// то если андефайнд, тогда задач параметры самому или лучше редиректнуть на дашборд
	const { state } = useLocation();
	// console.log(state);
	const [formState, dispatch] = useReducer(reducer, {
		name,
		phoneNumber,
		group,
		errorMessage: "",
		error: false,
	});
	const id = useId();
	const nameId = `${id}-name`;
	const phoneNumberId = `${id}-phoneNumber`;
	const groupId = `${id}-group`;
	const navigate = useNavigate();
	// добавить функционал что из респонс даты мы получаем или при измении или при создании - контакт
	// и тогда брвть его айди чтобы редиректиться на него
	const handleSubmit = async () => {
		try {
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
			const response = await fetch(state.requestURL, {
				method: state.requestMethod,
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});
			const data = await response.json();
			data.success ? navigate(state.redirectURL) : Error(data.errorMessage);
		} catch (error) {
			dispatch({ type: "SET_ERROR", payload: error.message });
		}
	};
	return (
		<PageTransitioner>
			<div className="h-full max-h-fit min-h-screen w-full overflow-hidden p-2 fx_col-center_center lg:h-screen lg:px-12 lg:pb-10 lg:pt-16">
				<form
					method="post"
					id="contact-form"
					className="w-full rounded-xl border border-solid border-gray-50 bg-day_primary bg-opacity-50 bg-clip-padding p-4 backdrop-blur-xl backdrop-filter dark:bg-night_primary dark:bg-opacity-70 md:w-9/12 lg:w-6/12 lg:px-20 lg:py-14 2xl:w-4/12"
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
						>
							<p className="mb-4 rounded-lg bg-red-600 p-1 text-center font-prompt text-lg font-medium text-day_text">
								{formState.errorMessage}
							</p>
						</m.div>
					)}
					<div>
						<label
							htmlFor={nameId}
							className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
						>
							Name
						</label>
						<input
							type="text"
							id={nameId}
							name={nameId}
							value={formState.name}
							className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
					<div>
						<label
							htmlFor={phoneNumberId}
							className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
						>
							phoneNumber
						</label>
						<input
							type="tel"
							id={phoneNumberId}
							name={phoneNumberId}
							value={formState.phoneNumber}
							className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
					<div>
						<label
							htmlFor={groupId}
							className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
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
							className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
						>
							<option value="none">none</option>
							<option value="family">family</option>
							<option value="friends">friends</option>
							<option value="collegues">collegues</option>
						</select>
					</div>
					<div className="mt-4 w-full gap-1 fx-between_center">
						<button
							className="mb-2 mr-2 rounded-lg border-[2px] border-solid border-day_text px-5 py-2.5 text-center font-kanit text-lg font-medium text-day_text hover:bg-night_background hover:text-night_text focus:outline-none focus:ring-4 active:bg-transparent active:text-day_text dark:hover:text-white  dark:active:text-day_text"
							type="submit"
						>
							Save
						</button>
						<button
							className="mb-2 mr-2 rounded-lg border-[2px] border-solid border-day_text px-5 py-2.5 text-center font-kanit text-lg font-medium text-day_text hover:bg-night_background hover:text-night_text focus:outline-none focus:ring-4 active:bg-transparent active:text-day_text dark:hover:text-white  dark:active:text-day_text"
							type="button"
							onClick={() => {
								navigate(-1);
							}}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</PageTransitioner>
	);
};

export default Edit;
