import React, {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useReducer,
} from "react";
import { useCookies } from "react-cookie";
import { AUTH_INITIAL_STATE, authReducer } from "./utils/authReducer";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	// create a state
	const [currentUser, authDispatch] = useReducer(
		authReducer,
		AUTH_INITIAL_STATE,
	);
	// get to work w/ cookies via 3d party lib
	const [cookies, removeCookie] = useCookies([]);

	const fetchAuth = useCallback(async () => {
		// so according to backend logic
		// you call an endpoint to verify the token that passed in from cookies
		// and if there's no problem - save user data
		// ? catch logic to update somehow ?
		try {
			const response = await fetch("http://localhost:8082/api/verify", {
				credentials: "include",
			});
			const data = await response.json();
			if (data.errorMessage) throw new Error(data.errorMessage);
			authDispatch({
				type: "SET_AUTHORIZED_USER",
				payload: { username: data.data.username, id: data.data.id },
			});
		} catch (error) {
			console.log(error);
		}
	}, []);

	const logOut = useCallback(() => {
		removeCookie("token");
		authDispatch({ type: "SET_UNAUTHORIZED_USER" });
	}, [removeCookie]);

	useEffect(() => {
		// ? maybe we dont need this
		if (!cookies.token) {
			authDispatch({ type: "SET_UNAUTHORIZED_USER" });
		}
		fetchAuth();
	}, [cookies.token, fetchAuth]);

	// optimization
	const value = useMemo(
		() => ({ currentUser, authDispatch, fetchAuth, logOut }),
		[currentUser, authDispatch, fetchAuth, logOut],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
