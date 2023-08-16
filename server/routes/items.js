import express from "express";
import { findAllItems } from "../controllers/items.js";

const itemsRouter = express.Router();

itemsRouter.get("/all", findAllItems);

export default itemsRouter;
