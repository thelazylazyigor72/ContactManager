import React from "react";
import ReactLoading from "react-loading";

// size prop to make 2 cases,
// when its screen sized
// and within some section
// u can pass either screen or full
const Loading = ({ size }) => {
	// via 3rd party lib i got a simple loader-spinner
	return (
		<div className={`h-${size} w-${size} px-2 fx-center_center lg:px-20`}>
			<ReactLoading type="spin" color="#72dfa6" height="20%" width="20%" />
		</div>
	);
};

export default Loading;
