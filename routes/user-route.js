import express from "express";

import { getAllUsers, signUp } from "../controllers/user-controller.js"

const userRouter = express.Router();

userRouter.get('/', getAllUsers);

userRouter.post('/signup', signUp);

export default userRouter;