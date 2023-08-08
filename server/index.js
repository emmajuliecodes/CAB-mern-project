import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import * as dotenv from "dotenv";
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
};

const connectDatabase = async () => {
	await mongoose.connect(process.env.MONGO_URI);
	app.listen(port, () => {
		console.log("Server is running on port ..." + port);
	});
};

import userRouter from "./routes/user.js";

const defineRoutes = () => {
	app.use("/api/users", userRouter);
	app.use("*", (req, res) =>
		res.status(404).json({ error: "Endpoint not found." })
	);
};

connectMiddlewares();
defineRoutes();
connectDatabase();
