import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

// ? loader w/ gettin contact data, or maybe in outlet ?
const Workspace = () => {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
};

export default Workspace;
