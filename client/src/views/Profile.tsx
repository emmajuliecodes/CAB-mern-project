import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";

function UserProfile() {
	const baseURL = import.meta.env.VITE_SERVER_BASE as string;
	console.log(baseURL, "baseurl");
	const { user } = useContext(AuthContext);
	const params = useParams();
	console.log(params, "params");
	const [updateMode, setUpdateMode] = useState(false);
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		avatar: {},
		newPassword: "",
		oldPassword: "",
		newPwInvalid: false,
		oldPwInvalid: false,
	});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFormData({
				...formData,
				selectedFile: e.target.files[0],
			});
		}
	};

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (user) {
			if (formData.username !== user.username) {
				// Handle username change
				// ...
			} else if (formData.email !== user.email) {
				// Handle email change
				// ...
			} else if (formData.avatar) {
				// Handle file upload
				// ...
			} else if (formData.newPassword && formData.oldPassword) {
				// Handle password change
				// ...
			}
		}
	};

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

			<button onClick={() => setUpdateMode(!updateMode)}>Update profile</button>
			<form
				onSubmit={handleFormSubmit}
				style={
					updateMode
						? {
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								gap: 30,
						  }
						: { display: "none" }
				}>
				<input
					type="text"
					name="username"
					value={formData.username}
					onChange={handleInputChange}></input>
				<label htmlFor="username">User name</label>

				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleInputChange}
				/>
				<label htmlFor="username">Email address</label>

				<input type="password" name="password" onChange={handleInputChange} />
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						gap: 5,
					}}>
					<label htmlFor="profile_picture">Avatar:</label>
					<input
						type="file"
						name="avatar"
						placeholder="New avatar"
						onChange={handleFileAttach}
					/>
				</div>

				<button type="submit">Save Updates</button>
			</form>
		</div>
	);
}

export default UserProfile;
