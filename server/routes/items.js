import express from "express";
import { findAllItems, createItem } from "../controllers/items.js";
import { multerUpload } from "../middlewares/multer.js";

const itemsRouter = express.Router();

itemsRouter.get("/all", findAllItems);

itemsRouter.post("/new", multerUpload.array("photos", 5), createItem);

export default itemsRouter;
