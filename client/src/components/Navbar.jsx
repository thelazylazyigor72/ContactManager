import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion as m } from "framer-motion";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { IoPersonCircleSharp, IoPersonAddSharp } from "react-icons/io5";
import { useAuthContext } from "../authContext";

const menuVariants = {
	initial: {
		y: "-100%",
	},
	active: {
		y: "0",
		transition: {
			duration: 0.45,
			ease: "backInOut",
			delayChildren: 0.45,
			staggerChildren: 0.5,
		},
	},
	exit: {
		y: "-100%",
		transition: {
			when: "afterChildren",
			duration: 0.45,
			ease: "circIn",
			staggerChildren: 0.5,
			staggerDirection: -1,
		},
	},
};

const menuElement = {
	initial: { y: 75 },
	active: {
		y: 0,
		transition: {
			duration: 0.2,
			ease: "easeIn",
		},
	},
	exit: {
		y: -75,
		transition: {
			duration: 0.2,
			ease: "easeOut",
		},
	},
};

// todo responsiveness
const Navbar = () => {
	const location = useLocation();
	const navigate = useNavigate();

	// get user data
	const { currentUser, logOut } = useAuthContext();

	// burger menu flag
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// nothing really special, burger menu on mobiles and navigation bar on bigger screens
	return (
		<m.div
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			transition={{ delay: 0.75 }}
			className="fixed left-0 top-0 z-[100] w-full px-2 py-2 fx-between_center lg:px-20 3xl:px-64"
		>
			<m.button
				whileTap={{ scale: 0.9 }}
				whileHover={{ scale: 1.05 }}
				transition={{
					type: "spring",
					stiffness: 400,
					damping: 17,
					bounce: 1,
				}}
				type="button"
				onClick={() => navigate("/dashboard")}
				className="hidden font-kanit text-xl uppercase text-day_text  dark:text-night_text md:fx-center_center 2xl:text-2xl"
			>
				<IoPersonCircleSharp className="mr-1 text-4xl text-day_text dark:text-night_text" />
				{currentUser.username}
			</m.button>
			<Link
				to="/dashboard/contact/create"
				state={{
					requestURL: `http://localhost:${process.env.REACT_APP_PORT}/api/contact`,
					requestMethod: "POST",
					redirectURL: "/dashboard",
				}}
			>
				<m.button
					whileTap={{ scale: 0.9 }}
					whileHover={{ scale: 1.05 }}
					transition={{
						type: "spring",
						stiffness: 400,
						damping: 17,
						bounce: 1,
					}}
					type="button"
					disabled={location.pathname.includes("edit") ? true : false}
					className="z-[60] float-right  text-4xl text-day_text hover:text-night_accent active:text-day_accent disabled:text-slate-500 dark:text-night_text dark:disabled:text-slate-500 2xl:text-4xl"
				>
					<IoPersonAddSharp />
				</m.button>
			</Link>
			<m.button
				whileTap={{ scale: 0.9 }}
				whileHover={{ scale: 1.1 }}
				className="hidden rounded-lg border border-solid border-day_text bg-day_primary px-6 py-1 font-kanit text-lg uppercase hover:bg-night_accent active:bg-day_accent md:block 2xl:text-2xl"
				type="button"
				onClick={() => navigate("/")}
			>
				home
			</m.button>
			<m.button
				whileTap={{ scale: 0.9 }}
				whileHover={{ scale: 1.1 }}
				className="hidden rounded-lg border border-solid border-day_text bg-day_primary px-6 py-1 font-kanit text-lg uppercase hover:bg-night_accent active:bg-day_accent md:block 2xl:text-2xl"
				type="button"
				onClick={() => logOut()}
			>
				logout
			</m.button>
			<AnimatePresence>
				{isMenuOpen && (
					<m.div
						variants={menuVariants}
						initial="initial"
						animate="active"
						exit="exit"
						className="fixed left-0 top-0 z-[50] h-full w-full bg-day_accent opacity-95 fx_col-evenly_center dark:bg-night_secondary md:static md:inline-flex md:h-auto md:w-fit md:translate-x-0 md:flex-row md:items-center md:justify-between md:bg-transparent dark:md:bg-transparent"
					>
						<div className="overflow-hidden">
							<m.div
								variants={menuElement}
								className="font-kanit text-xl uppercase fx-center_center dark:text-night_text"
							>
								<IoPersonCircleSharp className="mr-1 text-4xl text-day_primary" />
								{currentUser.username}
							</m.div>
						</div>
						<div className="overflow-hidden">
							<m.button
								variants={menuElement}
								whileTap={{ scale: 0.9 }}
								whileHover={{ scale: 1.1 }}
								className="rounded-lg bg-day_primary px-6 py-1 font-kanit text-lg uppercase"
								type="button"
								onClick={() => navigate("/")}
							>
								home
							</m.button>
						</div>
						<div className="overflow-hidden">
							<m.button
								whileTap={{ scale: 0.9 }}
								whileHover={{ scale: 1.1 }}
								variants={menuElement}
								className="rounded-lg bg-day_primary px-6 py-1 font-kanit text-lg uppercase"
								type="button"
							>
								logout
							</m.button>
						</div>
					</m.div>
				)}
			</AnimatePresence>
			<m.button
				whileTap={{ scale: 0.9 }}
				transition={{ type: "spring", stiffness: 400, damping: 17, bounce: 1 }}
				type="button"
				className="active:text-light_blue dark:active:text-light_blue z-[60] float-right text-5xl text-black dark:text-white md:hidden 2xl:text-7xl"
			>
				{isMenuOpen ? (
					<HiXMark
						onClick={() => {
							setIsMenuOpen(!isMenuOpen);
						}}
					/>
				) : (
					<HiBars3
						onClick={() => {
							setIsMenuOpen(!isMenuOpen);
						}}
					/>
				)}
			</m.button>
		</m.div>
	);
};

export default Navbar;
