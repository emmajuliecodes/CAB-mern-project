export interface NotOk {
	error: string;
}

export interface User {
	_id: string;
	email: string;
	username: string;
	createdAt: string;
	items: Items[];
	avatar: string;
}

export interface Item {
	_id: string;
	item: string;
	available: boolean;
	owner: string | User;
	short_description: string;
	long_description: string;
	category: Array[];
	offer_type: [];
	images: string;
}

export type Users = User[];
export type Items = Item[];
