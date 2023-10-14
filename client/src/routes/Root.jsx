import React from "react";
import { Outlet } from "react-router-dom";
import ThemeSwitcher from "../components/ThemeSwitcher";

// basically i want only theme switcher button to be permanent, soooo
const Root = () => {
	return (
		<>
			<ThemeSwitcher />
			<Outlet />
		</>
	);
};

export default Root;
