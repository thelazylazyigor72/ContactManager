import React, { Suspense, useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Spline from "@splinetool/react-spline";
import { useNavigate, useNavigation } from "react-router-dom";
import Loading from "../components/Loading";
import { useAuthContext } from "../authContext";
import Button from "../components/Button";
import Appearance from "../components/Appearance";
import PageTransitioner from "../components/PageTransitioner";

// я считаю, что здесь мемоизация appearance компонента
// избыточна, а потенциальная угроза перфомансу
// с его стороны - очень мала
function Index() {
	const navigate = useNavigate();
	const navigation = useNavigation();

	// ref for 3d model
	const icon = useRef();

	const { currentUser, logOut, fetchAuth } = useAuthContext();

	// verify initialy auth onload
	useEffect(() => {
		fetchAuth();
	}, []);

	// section of memoized handlers for button component
	const handleDashboard = useCallback(() => {
		navigate("/dashboard");
	}, [navigate]);

	const handleLogOut = useCallback(() => {
		logOut();
	}, [logOut]);

	const handleLogin = useCallback(() => {
		navigate("/login");
	}, [navigate]);

	const handleSignIn = useCallback(() => {
		navigate("/signup");
	}, [navigate]);

	// handler for 3d model, start animation
	function onLoad(spline) {
		// everything according to spline docs
		// also, i turned off the zoom operation in the scene,
		// so ut can only be rotate withing OXOYOZ by mouse
		// and gsap animation, and thats it
		const obj = spline.findObjectByName("Phone");

		// save it in a ref for later use
		icon.current = obj;
		// and define a constant gsap animation
		gsap.to(icon.current?.rotation, {
			y: Math.PI * 2, // 360deg
			repeat: -1,
			duration: 5,
			ease: "none", // to make it smooth
		});
	}

	if (navigation.state === "loading") {
		return <Loading size="screen" />;
	}

	return (
		<PageTransitioner>
			<div className="h-full max-h-fit min-h-screen w-full p-2 fx_col-center_center lg:h-screen lg:px-12 lg:pb-10 lg:pt-16">
				<div className="h-full w-full fx_col-center_center lg:fx-center_center">
					<div className="h-full w-full text-center fx_col-center_center lg:w-1/2">
						<Appearance>
							<h1 className="font-kanit text-3xl font-normal text-day_text dark:text-night_text xl:text-5xl 3xl:text-7xl">
								{currentUser.authorized
									? `${currentUser.username} ! Welcome to Contact Manager ! `
									: "Stranger ! Welcome to Contact Manager !"}
							</h1>
						</Appearance>
						<Appearance width="w-full md:w-7/12 lg:w-full">
							<p className="mb-10 mt-4 w-full font-prompt text-xl font-extralight text-day_text dark:text-night_text md:font-normal xl:text-2xl 2xl:text-3xl">
								In this application you can create an account and manage all
								your contacts. You can create, delete and update each one of
								them and little more. So, go ahead and hope you enjoy !
							</p>
						</Appearance>
						<div className="w-full fx-evenly_center">
							{currentUser.authorized ? (
								<>
									<Button text="Dashboard" handler={handleDashboard} />
									<Button text="Log Out" handler={handleLogOut} />
								</>
							) : (
								<>
									<Button text="Login" handler={handleLogin} />
									<Button text="SignUp" handler={handleSignIn} />
								</>
							)}
						</div>
					</div>
					<div className="pointer-events-none  h-auto w-[90%] lg:pointer-events-auto  lg:h-full lg:w-2/4">
						<Suspense fallback={<Loading size="full" />}>
							<Spline
								onLoad={onLoad}
								scene="https://prod.spline.design/lzXEWwm2u3BxinIu/scene.splinecode"
							/>
						</Suspense>
					</div>
				</div>
				<span className="fixed bottom-0 right-0 rounded-tl-md bg-day_accent font-kanit text-sm font-thin text-night_text opacity-50">
					made by @thelazylazyigor72
				</span>
			</div>
		</PageTransitioner>
	);
}

export default Index;
