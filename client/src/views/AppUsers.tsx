import "../App.css";

import { useState, useEffect } from "react";
import { NotOk, Users } from "../@types";
import UserCard from "../components/UserCard";
import CreateUserForm from "../components/CreateUserForm";

function AppUsers() {
	const baseURL = import.meta.env.VITE_SERVER_BASE as string;
	console.log(baseURL, "baseurl");
	const [users, setUsers] = useState<Users>([]);

	useEffect(() => {
		const fetchAllUsers = async () => {
			try {
				const response = await fetch(`${baseURL}api/users/all`);
				// console.log("response", response); // will be 'true' if status code is in 200 zone, else 'false'
				if (response.ok) {
					const result = (await response.json()) as Users;
					setUsers(result);
					console.log(result);
				} else {
					const result = (await response.json()) as NotOk;
					alert(result.error);
				}
			} catch (e) {
				console.log(e);
				const { message } = e as Error; //could also use 'instanceof' to check for type
				alert(message);
			}
		};
		fetchAllUsers().catch((e) => console.log(e));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: "1em",
			}}>
			<h1>MERN Project!!</h1>
			{users.length === 0 ? (
				<p>No Users 😞</p>
			) : (
				<>
					<h2>My current users are:</h2>
					{users.map((u) => {
						return <UserCard key={u._id} user={u} />;
					})}
				</>
			)}
			<CreateUserForm setUsers={setUsers} users={users} />
		</div>
	);
}

export default AppUsers;
