import { Router } from "express";
import {
  getUser,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import userMiddleWare from "../middleware/userMiddleWare.js";

const userRouter = Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/get-user-by-id", userMiddleWare, getUser);
export default userRouter;
