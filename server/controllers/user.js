import { UserModel } from "../models/user.js";
import { imageUpload } from "../utilities/imageManagement.js";
import { encryptPassword, verifyPassword } from "../utilities/bcrypt.js";
import { generateToken } from "../utilities/jwt.js";

const testResponse = (req, res) => {
	console.log(req);
	res.send("We have a response!!");
};

const findAllUsers = async (request, response) => {
	try {
		const users = await UserModel.find().populate("items");
		console.log(users, "users");
		if (users) {
			const forFront = [];
			users.forEach((user) =>
				forFront.push({
					email: user.email,
					username: user.username,
					createdAt: user.createdAt,
					_id: user._id,
					items: user.items,
					avatar: user.avatar,
				})
			);
			response.status(200).json(forFront);
		} else {
			response.status(404).json({ error: "nothing in collection" });
		}
	} catch (e) {
		console.log(e, "e");
		response.status(500).json({ error: "Something went wrong..." });
	}
};

const findUserByEmail = async (req, res) => {
	const { email } = req.params;
	if (email && email.includes("@")) {
		try {
			const foundUser = await UserModel.findOne({ email: email });
			if (foundUser) {
				const forFront = {
					email: foundUser.email,
					username: foundUser.username,
					_id: foundUser._id,
					createdAt: foundUser.createdAt,
				};
				res.status(200).json(forFront);
			} else {
				res.status(404).json({ error: "No user found" });
			}
		} catch (e) {
			res.status(500).json({ error: "Something went wrong" });
		}
	} else {
		res.status(400).json({ error: "valid mail must be included" });
	}
};

const createUser = async (req, res) => {
	console.log(req.body);
	const { email, password, username } = req.body;
	if (!email || !password || !username) {
		res.status(400).json({ error: "All fields must be filled out" });
		return;
	}
	const result = await imageUpload(req.file, "user_avatars");
	const hashedPassword = await encryptPassword(password);
	const newUser = new UserModel({
		email,
		password: hashedPassword,
		username,
		avatar: result,
	});
	try {
		const result = await newUser.save();
		const forFront = {
			email: result.email,
			username: result.username,
			_id: result._id,
			createdAt: result.createdAt,
			avatar: result.avatar,
			items: result.items,
		};
		res.status(200).json(forFront);
	} catch (e) {
		console.log(e);
		e.code === 11000
			? res.status(406).json({ error: "That email is already registered" })
			: res.status(500).json({ error: "Unknown error occured" });
	}
};

//  Come back to update user

const updateUser = async (req, res) => {
	const { _id } = req.body;
	console.log(req.body);
	try {
		const result = await UserModel.findByIdAndUpdate(req.body._id, req.body, {
			new: true,
		});
		res.status(200).json(result);
	} catch (e) {
		res.status(500).json({ error: "Something went wrong..." });
	}
};

const updatePassword = async (req, res) => {
	const { password: stringPassword, _id } = req.body;
	try {
		const hashedPassword = await encryptPassword(stringPassword);
		console.log(stringPassword, _id, hashedPassword);
		const result = await UserModel.findByIdAndUpdate(
			_id,
			{ password: hashedPassword },
			{ new: true }
		);
		res.status(200).json({ message: "password updated!" });
	} catch (error) {
		res.status(500).json({ error: "Something went wrong..." });
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const existingUser = await UserModel.findOne({ email });
		if (!existingUser)
			return res.status(404).json({ error: "No user with that email." });
		const verified = await verifyPassword(password, existingUser.password);
		if (!verified)
			return res.status(401).json({ error: "Password doesn't match." });
		const token = generateToken(existingUser);
		const forFront = {
			email: existingUser.email,
			username: existingUser.username,
			_id: existingUser._id,
			createdAt: existingUser.createdAt,
			avatar: existingUser.avatar,
			items: existingUser.items,
		};
		res.status(200).json({ verified, token, user: forFront });
	} catch (error) {
		res.status(500).json({ error: "Something went wrong..." });
	}
};

const getMe = async (req, res) => {
	// res.status(200).json(req.user) // full user, including private data
	const forFront = {
		email: req.user.email,
		username: req.user.username,
		_id: req.user._id,
		createdAt: req.user.createdAt,
		avatar: req.user.avatar,
		items: req.user.items,
	};
	res.status(200).json(forFront); // return new object with only chosen properties
};

export {
	testResponse,
	findAllUsers,
	findUserByEmail,
	createUser,
	updateUser,
	login,
	getMe,
	updatePassword,
};
