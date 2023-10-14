import React, { useContext, useMemo, useReducer } from "react";

const AppContext = React.createContext();

// initial state for application data
const INITIAL_STATE = {
	contacts: [],
	message: "", // ? im not sure about this
};

// reducer for application data
const reducer = (state, action) => {
	switch (action.type) {
		case "SET_CONTACTS":
			return {
				...state,
				contacts: action.payload,
			};
		default:
			throw new Error(`unknown action ${action.type}`);
	}
};

export const AppProvider = ({ children }) => {
	// create a state
	const [data, dispatch] = useReducer(reducer, INITIAL_STATE);

	// optimization
	const value = useMemo(() => ({ data, dispatch }), [data, dispatch]);

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
