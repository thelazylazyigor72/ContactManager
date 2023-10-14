export default login = async () => {
	const response = await fetch();
	const data = await response.json();
	return { data };
};
