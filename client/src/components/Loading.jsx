import React from "react";
import ReactLoading from "react-loading";

const Loading = () => {
	// via 3rd party lib i got a simple loader-spinner
	return (
		<div className="h-screen w-screen px-2 fx-center_center lg:px-20">
			<ReactLoading type="spin" color="#72dfa6" height="20%" width="20%" />
		</div>
	);
};

export default Loading;
