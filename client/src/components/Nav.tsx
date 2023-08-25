import { NavLink } from "react-router-dom";

function Nav() {
	const navContainerStyles: React.CSSProperties = {
		width: "100%",
		height: "50px",
		border: "solid 1px black",
		display: "flex",
		gap: "1em",
		alignItems: "center",
		padding: "0 1em",
	};

	const activeLink: React.CSSProperties = {
		color: "red",
		fontWeight: "bold",
	};

	return (
		<nav style={navContainerStyles}>
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
		</nav>
	);
}

export default Nav;
