export const INITIAL_STATE = {
	name: "",
	phoneNumber: "",
	group: "none",
	errorMessage: "",
	error: false,
};

export const reducer = (state, action) => {
	switch (action.type) {
		case "SET_ERROR":
			return {
				...state,
				error: true,
				errorMessage: action.payload,
			};
		case "INPUT_CHANGE":
			return {
				...state,
				[action.payload.key]: action.payload.value,
			};
		default:
			throw new Error(`unknown action ${action.type}`);
	}
};
