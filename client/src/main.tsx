import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Error404 from "./views/Error404.tsx";
import Home from "./views/Home.tsx";
import WithNav from "./components/Layouts/WithNav.tsx";
import Login from "./views/Login.tsx";
import AppUsers from "./views/AppUsers.tsx";
import Listings from "./views/Listings.tsx";

const router = createBrowserRouter([
	{
		element: (
			<WithNav>
				<Outlet />
			</WithNav>
		),

		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/listings",
				element: <Listings />,
			},
			{
				path: "/users",
				element: <AppUsers />,
			},
			{
				path: "/login",
				element: <Login />,
			},
		],
	},
	{
		path: "*",
		element: <Error404 />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
