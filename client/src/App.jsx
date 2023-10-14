import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Index from "./routes/Index";
import ErrorPage from "./routes/ErrorPage";
import "./index.css";
import LoginPage from "./routes/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./routes/Dashboard";

// я вычленил всю логику роутера в отдельный Компонент
// чтобы иметь возможность вызывать функции контекстов из action роутера
const App = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Root />,
			errorElement: <ErrorPage />,
			children: [
				{
					errorElement: <ErrorPage />,
					children: [
						{
							index: true,
							element: <Index />,
						},
						{
							path: "/login",
							element: <LoginPage />,
							errorElement: <ErrorPage />,
						},
						{
							path: "/dashboard",
							element: (
								<ProtectedRoute>
									<Dashboard />
								</ProtectedRoute>
							),
							errorElement: <ErrorPage />,
							children: [{}],
						},
					],
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
};

export default App;
