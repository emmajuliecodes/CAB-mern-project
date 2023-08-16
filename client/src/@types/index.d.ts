export interface NotOk {
	error: string;
}

export interface User {
	_id: string;
	email: string;
	username: string;
	createdAt: string;
}

export interface Item {
	_id: string;
	item: string;
	available: boolean;
	owner: string | User;
}

export type Users = User[];
