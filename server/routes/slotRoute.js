import { Router } from "express";
import {
  createSlot,
  getAllSlots,
  getSlot,
} from "../controllers/slotController.js";
import userMiddleWare from "../middleware/userMiddleWare.js";

const slotRouter = Router();
slotRouter.post("/create", userMiddleWare, createSlot);
slotRouter.get("/get-slots", getAllSlots);
slotRouter.get("/get-slot/:slotID", getSlot);
export default slotRouter;
