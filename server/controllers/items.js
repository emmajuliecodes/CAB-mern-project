import { ItemModel } from "../models/items.js";
import { imageUpload } from "../utilities/imageManagement.js";

// ADD IN POPULATE OWNER, THEN SPECIFY WHAT WE WANT IT TO POPULATE WITH (USERNAME, EMAIL - path owner)

const findAllItems = async (req, res) => {
	try {
		const items = await ItemModel.find().populate({
			path: "owner",
			select: ["username", "email"],
		});
		console.log(items, "items");
		if (items) {
			const forFront = [];
			items.forEach((item) =>
				forFront.push({
					_id: item._id,
					item: item.item,
					available: item.available,
					// owner: item.owner.username,
					short_description: item.short_description,
					long_description: item.long_description,
					category: item.category,
					offer_type: item.offer_type,
					images: item.images,
				})
			);
			res.status(200).json(forFront);
		} else {
			response.status(404).json({ error: "nothing in collection" });
		}
	} catch (e) {
		console.log(e, "e");
		res.status(500).json({ error: "Something went wrong..." });
	}
};

const createItem = async (req, res) => {
	console.log(req.body);
	const {
		_id,
		item,
		available,
		// owner,
		short_description,
		long_description,
		category,
		offer_type,
	} = req.body;

	if (!item || !short_description) {
		res.status(400).json({ error: "All fields must be filled out" });
		return;
	}
	const result = await imageUpload(req.files, "item_images");

	const newItem = new ItemModel({
		_id,
		item,
		available,
		// owner,
		short_description,
		long_description,
		category,
		offer_type,
		images: result,
	});

	try {
		const result = await newItem.save();
		const forFront = {
			_id: result._id,
			item: result.item,
			available: result.available,
			// owner: result.owner,
			short_description: result.short_description,
			long_description: result.long_description,
			category: result.category,
			offer_type: result.offer_type,
			images: result.images,
		};
		res.status(200).json(forFront);
	} catch (e) {
		console.log(e);
		e.code === 11000
			? res.status(406).json({ error: "That item is already here" })
			: res.status(500).json({ error: "Unknown error occured" });
	}
};

const findItemById = async (req, res) => {
	const { id } = req.params;
	if (id) {
		try {
			const foundItem = await ItemModel.findOne({ _id: id });

			if (foundItem) {
				const forFront = {
					_id: foundItem._id,
					item: foundItem.item,
					available: foundItem.available,
					owner: foundItem.owner,
					short_description: foundItem.short_description,
					long_description: foundItem.long_description,
					category: foundItem.category,
					offer_type: foundItem.offer_type,
					images: foundItem.images,
				};
				res.status(200).json(forFront);
			} else {
				res.status(404).json({ error: "No item found" });
			}
		} catch (e) {
			res.status(500).json({ error: "Something went wrong" });
		}
	} else {
		res.status(400).json({ error: "valid ID must be included" });
	}
};

export { findAllItems, createItem, findItemById };
