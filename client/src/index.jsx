import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./authContext";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
// implemented like that
// in case if ill need
// authContext within
// loader/actions
root.render(
	<React.StrictMode>
		<AuthProvider>
			<App />
		</AuthProvider>
	</React.StrictMode>,
);
