import { Router } from "express";
import {
  createTrip,
  getTrip,
  getTrips,
  updateTrip,
} from "../controllers/tripController.js";
import userMiddleWare from "../middleware/userMiddleWare.js";

const tripRouter = Router();
tripRouter.post("/create", userMiddleWare, createTrip);
tripRouter.post("/get-trips", userMiddleWare, getTrips);
tripRouter.get("/get-trip/:tripID", userMiddleWare, getTrip);
tripRouter.post("/update-trip/:tripID", userMiddleWare, updateTrip);

export default tripRouter;
