import mongoose from "mongoose";

const objectId = mongoose.Schema.Types.ObjectId;

const itemSchema = new mongoose.Schema(
	{
		item: { type: String, required: true },
		available: { type: Boolean, default: true },
		owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
		short_description: { type: String, required: true },
		long_description: { type: String, required: true },
		category: {
			type: Array,
			default: undefined,
		},
		offer_type: { type: Array("Free", "Swap"), required: true },
		images: {
			type: String,
			default:
				"https://res.cloudinary.com/dv3hucyyc/image/upload/v1692694737/cab-mern-images/tortoise_ya3lt1.jpg",
			required: true,
		},
	},
	{ timestamps: true }
);

export const ItemModel = mongoose.model("item", itemSchema);
