import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../authContext";

// in fact just a wrapper for routes
// that checks if user is authorized
const ProtectedRoute = ({ children }) => {
	const navigate = useNavigate();
	const { currentUser } = useAuthContext();

	// if not auth - go home
	useEffect(() => {
		if (!currentUser.authorized) {
			navigate("/");
		}
	}, [currentUser.authorized, navigate]);

	return children;
};

export default ProtectedRoute;
