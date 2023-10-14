import React, { useContext, useEffect, useMemo, useReducer } from "react";
import { useCookies } from "react-cookie";

const AuthContext = React.createContext();

// TODO вынести в файл стейт и редьюсер
// initial state for user data
const AUTH_INITIAL_STATE = {
	username: "",
	id: "",
	authorized: false,
};

// reducer for user data
const authReducer = (state, action) => {
	switch (action.type) {
		case "SET_AUTHORIZED_USER":
			return {
				username: action.payload.username,
				id: action.payload.id,
				authorized: true,
			};
		case "SET_UNAUTHORIZED_USER":
			return {
				username: "",
				id: "",
				authorized: false,
			};
		default:
			throw new Error(`unknown action ${action.type}`);
	}
};

export const AuthProvider = ({ children }) => {
	// create a state
	const [currentUser, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
	// get to work w/ cookies via 3d party lib
	const [cookies, removeCookie] = useCookies([]);

	const fetchAuth = async () => {
		// so according to backend logic
		// you call an endpoint to verify the token that passed in from cookies
		// and if there's no problem - save user data
		// ? catch logic to update
		try {
			const response = await fetch("http://localhost:8082/api/verify", {
				credentials: "include",
			});
			const data = await response.json();
			if (data.errorMessage) throw new Error(data.errorMessage);
			dispatch({
				type: "SET_AUTHORIZED_USER",
				payload: { username: data.data.username, id: data.data.id },
			});
		} catch (error) {
			console.log(error);
		}
	};

	const logOut = () => {
		removeCookie("token");
		dispatch({ type: "SET_UNAUTHORIZED_USER" });
	};

	useEffect(() => {
		// ? maybe we dont need this
		if (!cookies.token) {
			dispatch({ type: "SET_UNAUTHORIZED_USER" });
		}
		fetchAuth();
	}, [cookies.token]);

	// optimization
	const value = useMemo(
		() => ({ currentUser, dispatch, fetchAuth, logOut }),
		[currentUser, dispatch, fetchAuth, logOut],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
