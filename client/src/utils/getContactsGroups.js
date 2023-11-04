const getContactsGroups = (contacts) => {
	const allGroups = contacts.map((item) => item.group);
	const uniqueGroups = [...new Set(allGroups)].map((group) =>
		group === "" ? "" : group,
	);
	uniqueGroups.unshift("none");
	return uniqueGroups;
};

export default getContactsGroups;
