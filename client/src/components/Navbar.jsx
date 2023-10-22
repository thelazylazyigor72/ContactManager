import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion as m } from "framer-motion";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { IoPersonCircleSharp, IoPersonAddSharp } from "react-icons/io5";
import motionSettings from "../utils/motionSettings";
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
	// get user data
	const { currentUser } = useAuthContext();

	// burger menu flag
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const navigate = useNavigate();

	// nothing really special, burger menu on mobiles and navigation bar on bigger screens
	return (
		<m.div
			initial={{ y: "-100%" }}
			animate={{ y: "0" }}
			transition={{ delay: 0.75 }}
			className="fixed left-0 top-0 z-[100] w-full px-2 py-2 fx-between_center lg:px-20"
		>
			<div className="hidden font-kanit text-xl uppercase text-day_text  dark:text-night_text md:fx-center_center 2xl:text-4xl">
				<IoPersonCircleSharp className="mr-1 text-4xl text-day_text dark:text-night_text" />
				{currentUser.username}
			</div>
			<m.div
				whileTap={{ scale: 0.9 }}
				transition={motionSettings}
				className="active:text-light_blue dark:active:text-light_blue z-[60] float-right text-4xl text-black dark:text-white 2xl:text-6xl"
			>
				<IoPersonAddSharp />
			</m.div>
			<m.button
				whileTap={{ scale: 0.9 }}
				whileHover={{ scale: 1.1 }}
				className="hidden rounded-lg bg-day_primary px-6 py-1 font-kanit text-lg uppercase md:block 2xl:text-4xl"
				type="button"
				onClick={() => navigate("/")}
			>
				home
			</m.button>
			<m.button
				whileTap={{ scale: 0.9 }}
				whileHover={{ scale: 1.1 }}
				className="hidden rounded-lg bg-day_primary px-6 py-1 font-kanit text-lg uppercase md:block 2xl:text-4xl"
				type="button"
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
				transition={motionSettings}
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
