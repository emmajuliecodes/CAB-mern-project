import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import userRouter from "./routes/user.js";
import itemsRouter from "./routes/items.js";
import configureCloudinary from "./config/cloudinary.js";
import configurePassport from "./config/passport.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const connectMiddlewares = () => {
	app.use(express.json());
	app.use(
		express.urlencoded({
			extended: true,
		})
	);
	app.use(cors());
	configureCloudinary();
	configurePassport();
};

const connectDatabase = async () => {
	await mongoose.connect(process.env.MONGO_URI);
	app.listen(port, () => {
		console.log("Server is running on port ..." + port);
	});
};

const defineRoutes = () => {
	app.use("/api/users", userRouter);
	app.use("/api/items", itemsRouter);
	app.use("*", (req, res) =>
		res.status(404).json({ error: "Endpoint not found." })
	);
};

connectMiddlewares();
defineRoutes();
connectDatabase();
