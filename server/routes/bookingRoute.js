import { Router } from "express";
import { createBooking } from "../controllers/bookingController.js";
import userMiddleWare from "../middleware/userMiddleWare.js";

const bookingRouter = Router();
bookingRouter.post("/create", userMiddleWare, createBooking);
export default bookingRouter;
