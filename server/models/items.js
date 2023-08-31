import mongoose from "mongoose";

const objectId = mongoose.Schema.Types.ObjectId;

const itemSchema = new mongoose.Schema(
	{
		_id: { type: String, required: true },
		item: { type: String, required: true },
		available: { type: Boolean, default: true, required: true },
		owner: { type: objectId, ref: "user", required: true },
		short_description: { type: String, required: true },
		long_description: { type: String, required: true },
		category: {
			type: Array(
				"Plants",
				"Furniture",
				"Electronics",
				"Decorative",
				"Clothing & accessories",
				"Toys & Games",
				"Music, film & books",
				"Other"
			),
			required: true,
		},

		offer_type: { type: Array("Free", "Swap"), required: true },
		images: {
			type: String,
			required: true,
			default:
				"https://res.cloudinary.com/dv3hucyyc/image/upload/v1692694737/cab-mern-images/tortoise_ya3lt1.jpg",
		},
	},
	{ timestamps: true }
);

export const ItemModel = mongoose.model("item", itemSchema);
