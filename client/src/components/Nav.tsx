import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Nav() {
	const { user, logout } = useContext(AuthContext);
	const loginRedirect = useNavigate("/login");
	const navContainerStyles: React.CSSProperties = {
		height: "50px",
		border: "solid 1px black",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "0 1em",
	};

	const linksContainerStyles: React.CSSProperties = {
		display: "flex",
		gap: "1em",
	};

	const activeLink: React.CSSProperties = {
		color: "red",
		fontWeight: "bold",
	};

	return (
		<nav style={navContainerStyles}>
			<div style={linksContainerStyles}>
				<NavLink to="/" style={({ isActive }) => (isActive ? activeLink : {})}>
					Home
				</NavLink>
				<NavLink
					to="/listings"
					style={({ isActive }) => (isActive ? activeLink : {})}>
					Listings
				</NavLink>
				<NavLink
					to="/users"
					style={({ isActive }) => (isActive ? activeLink : {})}>
					Users
				</NavLink>
				<NavLink
					to="/login"
					style={({ isActive }) => (isActive ? activeLink : {})}>
					Login
				</NavLink>
				<NavLink
					to="/register"
					style={({ isActive }) => (isActive ? activeLink : {})}>
					Register
				</NavLink>
				<NavLink
					to="/profile"
					style={({ isActive }) => (isActive ? activeLink : {})}>
					Profile
				</NavLink>
			</div>
			<p>
				{" "}
				{user ? (
					<button onClick={logout}>Logout</button>
				) : (
					<button onClick={loginRedirect}>Login</button>
				)}
			</p>
		</nav>
	);
}

export default Nav;
