import mongoose from "mongoose";

const objectId = mongoose.Schema.Types.ObjectId;

const itemSchema = new mongoose.Schema(
	{
		item: { type: String, required: true },
		available: { type: Boolean, default: true, required: true },
		owner: { type: objectId, ref: "user", required: true },
	},
	{ timestamps: true }
);

export const ItemModel = mongoose.model("item", itemSchema);
