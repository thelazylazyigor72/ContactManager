export const INITIAL_STATE = {
	search: "",
	contacts: [],
	currentPage: 1,
	showedContacts: [],
	filteredContacts: [],
};

export const reducer = (state, action) => {
	switch (action.type) {
		case "SET_CONTACTS":
			return {
				...state,
				contacts: action.payload,
				filteredContacts: action.payload,
			};
		case "SET_SHOWED_CONTACTS":
			return {
				...state,
				showedContacts: action.payload,
			};
		case "INPUT_CHANGE":
			return {
				...state,
				filteredContacts: state?.contacts.filter(
					(contact) =>
						contact.name
							.toLowerCase()
							.indexOf(action.payload.value.toLowerCase()) !== -1,
				),
				[action.payload.key]: action.payload.value,
			};
		case "SET_NEXT_PAGE":
			return {
				...state,
				currentPage: state.currentPage + 1,
			};
		case "SET_PREVIOUS_PAGE":
			return {
				...state,
				currentPage: state.currentPage - 1,
			};
		case "SET_PAGE":
			return {
				...state,
				currentPage: action.payload,
			};
		case "SET_GROUP":
			return {
				...state,
				filteredContacts: state.contacts.filter((ctc) => {
					if (action.payload === "none") return ctc;
					return ctc.group === action.payload;
				}),
			};
		default:
			throw new Error(`unknown action ${action.type}`);
	}
};
