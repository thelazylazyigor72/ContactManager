import React, { useId, useReducer, useEffect } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { motion as m } from "framer-motion";
import { useAuthContext } from "../authContext";
import Loading from "../components/Loading";
import { INITIAL_STATE, reducer } from "../utils/signupReducer";
import PageTransitioner from "../components/PageTransitioner";

const SignUpPage = () => {
	const id = useId();
	const usernameId = `${id}-username`;
	const passwordId = `${id}-password`;
	const { currentUser, authDispatch } = useAuthContext();
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

	const navigate = useNavigate();

	const navigation = useNavigation();

	// if auth - go dashboard
	useEffect(() => {
		if (currentUser.authorized) {
			navigate("/dashboard");
		}
	}, [currentUser.authorized, navigate]);

	if (navigation.state === "loading") {
		return <Loading size="screen" />;
	}

	return (
		<PageTransitioner>
			<div className="h-full max-h-fit min-h-screen w-full overflow-hidden p-2 fx_col-center_center lg:h-screen lg:px-12 lg:pb-10 lg:pt-16">
				<form
					method="post"
					onSubmit={async (e) => {
						e.preventDefault();
						const { username, password } = state;
						try {
							if (!username || !password) {
								throw new Error("All fields required");
							}
							if (username.length < 6 || username.length > 26) {
								throw new Error(
									"Username length should be more than 6 and less than 26",
								);
							}
							if (password.length < 8 || password.length > 26) {
								throw new Error(
									"Password length should be more than 8 and less than 26",
								);
							}
							const response = await fetch(
								`http://localhost:${process.env.REACT_APP_PORT}/api/signup`,
								{
									method: "POST",
									credentials: "include",
									headers: {
										"Content-Type": "application/json",
									},
									body: JSON.stringify({ username, password }),
								},
							);
							const data = await response.json();
							if (!data.success) throw new Error(data.errorMessage);
							authDispatch({
								type: "SET_AUTHORIZED_USER",
								payload: { username: data.data.username, id: data.data.id },
							});
						} catch (error) {
							dispatch({ type: "SET_ERROR", payload: error.message });
						}
					}}
					className="w-full rounded-xl border border-solid border-day_accent bg-day_primary p-4 dark:bg-night_primary  md:w-9/12 lg:w-7/12 lg:px-20 lg:py-14 2xl:w-6/12"
				>
					<h1 className="mb-6 text-center font-kanit text-2xl font-medium uppercase 2xl:text-3xl">
						Sign Up
					</h1>
					{state.error && (
						<m.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{
								duration: 0.35,
								ease: "easeInOut",
							}}
						>
							<p className="mb-4 rounded-lg bg-red-600 p-1 text-center font-kanit text-lg font-medium text-day_text 2xl:text-xl 3xl:text-2xl">
								{state.errorMessage}
							</p>
						</m.div>
					)}
					<div className="group relative z-0 mb-6 w-full border-b border-solid border-day_text 3xl:mb-10">
						<input
							type="text"
							name={usernameId}
							id={usernameId}
							className="peer block w-full appearance-none border-0 border-b-2 border-day_text bg-transparent px-0 py-2.5 font-prompt text-sm text-gray-900 focus:outline-none focus:ring-0 dark:border-night_background 2xl:text-xl"
							placeholder=" "
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
							htmlFor={usernameId}
							className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform font-prompt text-base text-day_text duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-light 2xl:text-xl 3xl:text-2xl"
						>
							Username
						</label>
					</div>
					<div className="group relative z-0 mb-6  w-full border-b border-solid border-day_text 3xl:mb-10">
						<input
							type="password"
							name={passwordId}
							id={passwordId}
							className="peer block w-full appearance-none border-0 border-b-2 border-day_text bg-transparent px-0 py-2.5 font-prompt text-sm text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0 2xl:text-xl"
							placeholder=" "
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
							htmlFor={passwordId}
							className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform font-prompt text-base text-day_text duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-light 2xl:text-xl 3xl:text-2xl"
						>
							Password
						</label>
					</div>
					<div className="w-full flex-wrap gap-4 fx-evenly_center xs:gap-1">
						<m.button
							whileTap={{ scale: 0.9 }}
							whileHover={{ scale: 1.05 }}
							transition={{
								type: "spring",
								stiffness: 400,
								damping: 17,
								bounce: 1,
							}}
							className="mb-2 mr-2 rounded-lg border-[2px] border-solid border-day_text px-5 py-2.5 text-center font-kanit text-lg font-medium text-day_text hover:bg-night_background hover:text-night_text focus:outline-none focus:ring-4 active:bg-transparent active:text-day_text dark:hover:text-white dark:active:text-day_text 2xl:text-xl  3xl:text-2xl"
							type="submit"
						>
							Sign Up
						</m.button>
						<m.button
							whileTap={{ scale: 0.9 }}
							whileHover={{ scale: 1.05 }}
							transition={{
								type: "spring",
								stiffness: 400,
								damping: 17,
								bounce: 1,
							}}
							className="mb-2 mr-2 rounded-lg border-[2px] border-solid border-day_text px-5 py-2.5 text-center font-kanit text-lg font-medium text-day_text hover:bg-night_background hover:text-night_text focus:outline-none focus:ring-4 active:bg-transparent active:text-day_text dark:hover:text-white dark:active:text-day_text  2xl:text-xl 3xl:text-2xl"
							type="button"
							onClick={() => navigate("/login")}
						>
							Login
						</m.button>
						<m.button
							whileTap={{ scale: 0.9 }}
							whileHover={{ scale: 1.05 }}
							transition={{
								type: "spring",
								stiffness: 400,
								damping: 17,
								bounce: 1,
							}}
							className="mb-2 mr-2 rounded-lg border-[2px] border-solid border-day_text px-5 py-2.5 text-center font-kanit text-lg font-medium text-day_text hover:bg-night_background hover:text-night_text focus:outline-none focus:ring-4 active:bg-transparent active:text-day_text dark:hover:text-white dark:active:text-day_text 2xl:text-xl  3xl:text-2xl"
							type="button"
							onClick={() => navigate("/")}
						>
							Back
						</m.button>
					</div>
				</form>
			</div>
		</PageTransitioner>
	);
};

export default SignUpPage;
