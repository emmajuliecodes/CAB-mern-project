import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";

function UserProfile() {
	const baseURL = import.meta.env.VITE_SERVER_BASE as string;
	console.log(baseURL, "baseurl");
	const { user } = useContext(AuthContext);
	const params = useParams();
	console.log(params, "params");

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: "1em",
			}}>
			<h1>Profile</h1>
			<>{user && <h5>Email:{user.email}</h5>}</>

			<>{user && <h5>My Items:{user.items} </h5>}</>
		</div>
	);
}

export default UserProfile;
