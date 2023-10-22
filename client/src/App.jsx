import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Root from "./routes/Root";
import Index from "./routes/Index";
import ErrorPage from "./routes/ErrorPage";
import "./index.css";
import LoginPage from "./routes/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import SignUpPage from "./routes/SignUpPage";
import Workspace from "./routes/Workspace";
import Dashboard, { loader as dashboardLoader } from "./routes/Dashboard";

// я вычленил всю логику роутера в отдельный Компонент
// чтобы иметь возможность вызывать функции контекстов из action/loader роутера
// todo проверить что на детей воркспейса нельзя зайти без токена
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
							path: "/signin",
							element: <SignUpPage />,
							errorElement: <ErrorPage />,
						},
						{
							path: "/dashboard",
							element: (
								<ProtectedRoute>
									<Workspace />
								</ProtectedRoute>
							),
							errorElement: <ErrorPage />,
							children: [
								{
									index: true,
									element: <Dashboard />,
									loader: dashboardLoader,
									errorElement: <ErrorPage />,
								},
								{
									path: "dashboard/edit/:id",
									element: <Dashboard />,
									loader: dashboardLoader,
									errorElement: <ErrorPage />,
								},
							],
						},
					],
				},
			],
		},
	]);

	return (
		<AnimatePresence mode="wait">
			<RouterProvider key={router} router={router} />
		</AnimatePresence>
	);
};

export default App;
