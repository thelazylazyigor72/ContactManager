// initial state for application data
export const INITIAL_STATE = {
	contacts: [],
	message: "", // ? im not sure about this
};

// reducer for application data
export const reducer = (state, action) => {
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
