import mongoose from "mongoose";

const objectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		username: String,
		password: { type: String, required: true },
		items: [{ type: mongoose.Schema.Types.ObjectId, ref: "item" }],
	},
	{ timestamps: true }
);

export const UserModel = mongoose.model("user", userSchema);
