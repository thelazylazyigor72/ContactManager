import React, { useId, useReducer, useEffect } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthContext } from "../authContext";
import Loading from "../components/Loading";
import Appearance from "../components/Appearance";
import motionSettings from "../utils/motionSettings";
import { INITIAL_STATE, reducer } from "../utils/loginReducer";

// im not making react router action
// because in action i cant operate w/
// component state
// thats why i make my own submit handler

// TODO Appearance из-за двух инпутов каждый раз ререндерится
const LoginPage = () => {
	const id = useId();
	const { currentUser, fetchAuth } = useAuthContext();
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

	const navigate = useNavigate();

	const navigation = useNavigation();

	// if auth - go home
	useEffect(() => {
		if (currentUser.authorized) {
			navigate("/");
		}
	}, [currentUser.authorized, navigate]);

	if (navigation.state === "loading") {
		return <Loading />;
	}

	return (
		<div className="h-full max-h-fit min-h-screen w-full p-2 fx_col-center_center lg:h-screen lg:px-12 lg:pb-10 lg:pt-16">
			<Appearance width="w-full md:w-9/12 lg:w-6/12 2xl:w-4/12">
				<form
					method="post"
					onSubmit={async (e) => {
						e.preventDefault();
						const { username, password } = state;
						try {
							const response = await fetch("http://localhost:8082/api/login", {
								method: "POST",
								credentials: "include",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify({ username, password }),
							});
							const data = await response.json();
							if (!data.success) throw new Error(data.errorMessage);
							fetchAuth();
						} catch (error) {
							dispatch({ type: "SET_ERROR", payload: error.message });
						}
					}}
					className="rounded-xl border border-solid border-gray-50 bg-day_primary bg-opacity-50 bg-clip-padding p-4 backdrop-blur-xl backdrop-filter dark:bg-night_primary dark:bg-opacity-70 lg:px-20 lg:py-14"
				>
					<h1 className="mb-6 text-center font-kanit text-2xl font-medium uppercase 2xl:text-3xl">
						Login
					</h1>
					{state.error && (
						<Appearance>
							<p className="mb-4 rounded-lg bg-red-600 p-1 text-center font-prompt text-lg font-medium text-day_text">
								{state.errorMessage}
							</p>
						</Appearance>
					)}
					<div className="group relative z-0 mb-6 w-full border-b border-solid border-day_text">
						<input
							type="text"
							name={`${id}-username`}
							id={`${id}-username`}
							className="peer block w-full appearance-none border-0 border-b-2 border-day_text bg-transparent px-0 py-2.5 font-prompt text-sm text-gray-900 focus:outline-none focus:ring-0 dark:border-night_background"
							placeholder=" "
							required
							maxLength="30"
							minLength="4"
							value={state.username}
							onChange={(e) => {
								dispatch({
									type: "INPUT_CHANGE",
									payload: {
										key: "username",
										value: e.target.value,
									},
								});
							}}
						/>
						<label
							htmlFor={`${id}-username`}
							className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform font-prompt text-base text-day_text duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-light"
						>
							Username
						</label>
					</div>
					<div className="group relative z-0 mb-6 w-full border-b border-solid border-day_text">
						<input
							type="password"
							name={`${id}-password`}
							id={`${id}-password`}
							className="dark:border-night_backgroun peer block w-full appearance-none border-0 border-b-2 border-day_text bg-transparent px-0 py-2.5 font-prompt text-sm text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0"
							placeholder=" "
							required
							maxLength="26"
							minLength="8"
							value={state.password}
							onChange={(e) => {
								dispatch({
									type: "INPUT_CHANGE",
									payload: {
										key: "password",
										value: e.target.value,
									},
								});
							}}
						/>
						<label
							htmlFor={`${id}-password`}
							className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform font-prompt text-base text-day_text duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-light"
						>
							Password
						</label>
					</div>
					<div className="w-full flex-wrap gap-1 fx-evenly_center">
						<motion.button
							whileTap={{ scale: 0.9 }}
							transition={motionSettings}
							className="mb-2 mr-2 rounded-lg border-[2px] border-solid border-day_text px-5 py-2.5 text-center font-kanit text-lg font-medium text-day_text hover:bg-night_background hover:text-night_text		 focus:outline-none focus:ring-4 dark:hover:text-white"
							type="submit"
						>
							Login
						</motion.button>
						<motion.button
							whileTap={{ scale: 0.9 }}
							transition={motionSettings}
							className="mb-2 mr-2 rounded-lg border-[2px] border-solid border-day_text px-5 py-2.5 text-center font-kanit text-lg font-medium text-day_text hover:bg-night_background hover:text-night_text		 focus:outline-none focus:ring-4 dark:hover:text-white"
							type="button"
							onClick={() => navigate("/signin")}
						>
							Sign In
						</motion.button>
						<motion.button
							whileTap={{ scale: 0.9 }}
							transition={motionSettings}
							className="mb-2 mr-2 rounded-lg border-[2px] border-solid border-day_text px-5 py-2.5 text-center font-kanit text-lg font-medium text-day_text hover:bg-night_background hover:text-night_text		 focus:outline-none focus:ring-4 dark:hover:text-white"
							type="button"
							onClick={() => navigate(-1)}
						>
							Back
						</motion.button>
					</div>
				</form>
			</Appearance>
		</div>
	);
};

export default LoginPage;
