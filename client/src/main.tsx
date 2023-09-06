import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Error404 from "./views/Error404.tsx";
import Home from "./views/Home.tsx";
import WithNav from "./components/Layouts/WithNav.tsx";
import Login from "./views/Login.tsx";
import AppUsers from "./views/AppUsers.tsx";
import Listings from "./views/Listings.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import ListItemForm from "./views/ListItemForm.tsx";
import FullItemView from "./views/FullItemView.tsx";
import UserProfile from "./views/Profile.tsx";
import About from "./views/About.tsx";
import Register from "./views/Register.tsx";

const router = createBrowserRouter([
	{
		element: (
			<AuthContextProvider>
				<Outlet />
			</AuthContextProvider>
		),
		// putting context at outermost layer of router means it still wraps every route, but is also inside the router and can then use react router dom hooks like useNavigate
		children: [
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
					{
						path: "/listitem",
						element: <ListItemForm />,
					},
					{
						path: "/itemById/:_id",
						element: <FullItemView />,
					},
					{
						path: "/about",
						element: <About />,
					},
					{
						path: "/profile",
						element: <UserProfile />,
					},
					{
						path: "/register",
						element: <Register />,
					},
				],
			},
			{
				path: "*",
				element: <Error404 />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
