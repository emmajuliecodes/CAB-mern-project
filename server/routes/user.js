import express from "express";
import multerUpload from "../middlewares/multer.js";
import jwtAuth from "../middlewares/jwtAuth.js";

import {
	testResponse,
	findAllUsers,
	findUserByEmail,
	createUser,
	updateUser,
	getMe,
	login,
	updatePassword,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/testing", testResponse);
userRouter.get("/all", findAllUsers);
userRouter.get("/profile/:email", findUserByEmail);
userRouter.get("/me", jwtAuth, getMe);

userRouter.post("/new", multerUpload.single("image"), createUser);
userRouter.post("/update", multerUpload.single("image"), updateUser);
userRouter.post("/login", login);
userRouter.post("/updatePassword", jwtAuth, updatePassword);

export default userRouter;
