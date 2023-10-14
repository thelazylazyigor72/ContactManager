import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BsCameraReels } from "react-icons/bs";
import { HiBars3, HiXMark } from "react-icons/hi2";
import Button from "./Button";
import motionSettings from "../utils/motionSettings";

const Navbar = () => {
	// burger menu flag
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const navigate = useNavigate();

	// nothing really special, burger menu on mobiles and navigation bar on bigger screens
	return (
		<div className="bg-light_red dark:bg-dark_purple fixed left-0 top-0 z-[100] w-full bg-opacity-[0.25] px-2 transition duration-300 ease-in-out fx-between_center hover:bg-opacity-80 dark:bg-opacity-25 dark:hover:bg-opacity-75 lg:px-20 ">
			<motion.div
				whileTap={{ scale: 0.9 }}
				transition={motionSettings}
				className="hidden md:block"
			>
				<BsCameraReels
					onClick={() => navigate("/")}
					className="active:text-light_blue dark:active:text-light_blue hidden cursor-pointer text-3xl text-black dark:text-white md:block lg:text-4xl 2xl:text-5xl"
				/>
			</motion.div>
			<Button
				text="Home"
				handler={() => {
					console.log("fd");
				}}
			/>
			<Button
				text="LogOut"
				handler={() => {
					console.log("fd");
				}}
			/>
			<motion.button
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
			</motion.button>
		</div>
	);
};

export default Navbar;
