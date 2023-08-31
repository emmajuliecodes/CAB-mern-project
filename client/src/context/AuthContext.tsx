import { createContext, useState, ReactNode, useEffect } from "react";
import { NotOk, User } from "../@types";
import { useNavigate } from "react-router-dom";

interface DefaultValue {
	user: null | User;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
}

// interface SignupResult {
// 	user: User;
// 	token: string;
// }

interface LoginResult {
	verified: boolean;
	token: string;
	user: User;
}

const initialValue: DefaultValue = {
	user: null,
	login: () => {
		throw new Error("context not implemented.");
	},
	logout: () => {
		throw new Error("context not implemented.");
	},
};
export const AuthContext = createContext<DefaultValue>(initialValue);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const baseURL = import.meta.env.VITE_SERVER_BASE as string;
	const [user, setUser] = useState<null | User>(null);
	const redirect = useNavigate();

	const login = async (email: string, password: string) => {
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
		const urlencoded = new URLSearchParams();
		urlencoded.append("email", email);
		urlencoded.append("password", password);
		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: urlencoded,
		};
		try {
			const response = await fetch(`${baseURL}api/users/login`, requestOptions);
			if (!response.ok) {
				const result = (await response.json()) as NotOk;
				alert(result.error);
			} else {
				const result = (await response.json()) as LoginResult;
				console.log(result);
				setUser(result.user);
				localStorage.setItem("token", result.token);
				localStorage.setItem("user", JSON.stringify(result.user));
				alert("login successful!");
				redirect("/");
			}
		} catch (error) {
			console.log("error", error);
		}
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("token");
	};

	const getActiveUser = async () => {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				const myHeaders = new Headers();
				myHeaders.append("Authorization", `Bearer ${token}`);
				const requestOptions = {
					method: "GET",
					headers: myHeaders,
				};
				const response = await fetch(`${baseURL}api/users/me`, requestOptions);
				const result = (await response.json()) as User;
				setUser(result);
				console.log("active user", result);
			} catch (error) {
				console.log(error);
			}
		} else {
			setUser(null);
		}
	};

	useEffect(() => {
		getActiveUser().catch((e) => console.log(e));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};