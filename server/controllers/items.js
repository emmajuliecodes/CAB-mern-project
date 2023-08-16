import { ItemModel } from "../models/items.js";

const findAllItems = async (request, response) => {
	try {
		const items = await ItemModel.find();
		if (items) {
			response.status(200).json(items);
		} else {
			response.status(404).json({ error: "nothing in collection" });
		}
	} catch (e) {
		response.status(500).json({ error: "Something went wrong..." });
	}
};

export { findAllItems };
