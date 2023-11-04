import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Workspace = () => {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
};

export default Workspace;
