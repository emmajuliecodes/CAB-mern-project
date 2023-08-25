import mongoose from "mongoose";

const objectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		username: String,
		password: { type: String, required: true },
		items: [{ type: mongoose.Schema.Types.ObjectId, ref: "item" }],
		avatar: {
			type: String,
			required: true,
			default:
				"https://res.cloudinary.com/dv3hucyyc/image/upload/v1692694737/cab-mern-images/tortoise_ya3lt1.jpg",
		},
	},
	{ timestamps: true }
);

export const UserModel = mongoose.model("user", userSchema);
