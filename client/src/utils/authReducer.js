// initial state for user data
export const AUTH_INITIAL_STATE = {
	username: "",
	id: "",
	authorized: false,
};

// reducer for user data
export const authReducer = (state, action) => {
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
