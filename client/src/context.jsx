import React, { useContext, useMemo, useReducer } from "react";
import { INITIAL_STATE, reducer } from "./utils/appReducer";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
	// create a state
	const [data, dispatch] = useReducer(reducer, INITIAL_STATE);

	// optimization
	const value = useMemo(() => ({ data, dispatch }), [data, dispatch]);

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
