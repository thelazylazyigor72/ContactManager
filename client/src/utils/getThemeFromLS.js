// if theres no themetag we returning a false
const getThemeTagFromLocalStorage = () => {
	let themeTag = localStorage.getItem("themeTag");
	themeTag ? themeTag : (themeTag = false);
	return JSON.parse(themeTag);
};

export default getThemeTagFromLocalStorage;
