import express from "express";
import {
	findAllItems,
	createItem,
	findItemById,
} from "../controllers/items.js";
import multerUpload from "../middlewares/multer.js";

const itemsRouter = express.Router();

itemsRouter.get("/all", findAllItems);
itemsRouter.get("/itemById/:id", findItemById);

itemsRouter.post("/new", multerUpload.single("item image"), createItem);

export default itemsRouter;
