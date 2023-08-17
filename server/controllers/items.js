import { ItemModel } from "../models/items.js";

// ADD IN POPULATE OWNER, THEN SPECIFY WHAT WE WANT IT TO POPULATE WITH (USERNAME, EMAIL - path owner)

const findAllItems = async (req, res) => {
	try {
		const result = await ItemModel.find().populate({
			path: "owner",
			select: ["username", "email"],
		});

		res.status(200).json(result);
	} catch (e) {
		res.status(500).json({ error: "Something went wrong..." });
	}
};
export { findAllItems };
