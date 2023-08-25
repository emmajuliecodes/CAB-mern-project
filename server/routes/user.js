import express from "express";
import { multerUpload } from "../middlewares/multer.js";

import {
	testResponse,
	findAllUsers,
	findUserByEmail,
	createUser,
	updateUser,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/testing", testResponse);
userRouter.get("/all", findAllUsers);
userRouter.get("/email/:email", findUserByEmail);

userRouter.post("/new", multerUpload.single("image"), createUser);
userRouter.post("/update", multerUpload.single("image"), updateUser);

export default userRouter;
