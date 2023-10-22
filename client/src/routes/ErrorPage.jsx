import React, { useCallback } from "react";
import { useRouteError, useNavigate, useNavigation } from "react-router-dom";
import Loading from "../components/Loading";
import Button from "../components/Button";
import Appearance from "../components/Appearance";
import PageTransitioner from "../components/PageTransitioner";

const ErrorPage = () => {
	const error = useRouteError();

	const navigate = useNavigate();

	const navigation = useNavigation();

	const handleBack = useCallback(() => {
		navigate(-1);
	}, [navigate]);

	const handleHome = useCallback(() => {
		navigate("/");
	}, [navigate]);

	if (navigation.state === "loading") {
		return <Loading size="screen" />;
	}

	return (
		<PageTransitioner>
			<div className="h-screen w-full px-2 fx_col-center_center lg:px-20">
				<Appearance>
					<h1 className="text-center font-kanit text-3xl text-day_text dark:text-night_text 2xl:text-5xl">
						Oops! Nothing bad happened, it&apos;s not your fault, just try again
						a little bit later ! 😌
					</h1>
				</Appearance>
				<Appearance width="w-full">
					<p className="my-7 block text-center font-prompt text-xl text-day_text underline dark:text-night_text 2xl:text-3xl">
						<i>{error.statusText || error.message}</i>
					</p>
				</Appearance>
				<div className="flex-wrap gap-4 fx-center_center md:gap-6 lg:gap-8 xl:gap-10">
					<Button handler={handleBack} text="Back" />
					<Button handler={handleHome} text="Home" />
				</div>
			</div>
		</PageTransitioner>
	);
};

export default ErrorPage;
