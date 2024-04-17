import Trip from "../models/Trip.js";

export const createTrip = async (req, res) => {
  try {
    const newTrip = new Trip(req.body);
    await newTrip.save();
    res.status(200).send({
      message: "trip saved successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "something went wrong !",
      success: false,
    });
  }
};

export const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({
      user: req.body.userID,
    });
    res.status(200).send({
      message: "trips retrived successfully",
      success: true,
      data: trips,
    });
  } catch (error) {
    res.status(500).send({
      message: "something went wrong !",
      success: false,
    });
  }
};

export const getTrip = async (req, res) => {
  try {
    const result = await Trip.findById(req.params.tripID);
    res.status(200).send({
      message: "Trip retrieved successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      message: "something went wrong!",
      success: false,
    });
  }
};

export const updateTrip = async (req, res) => {
  try {
    const { newTrip } = req.body;
    const trip = await Trip.findById(req.params.tripID);
    if (!trip) {
      return res.status(404).send({
        message: "trip not found",
        success: false,
      });
    }
    (trip.title = newTrip.title),
      (trip.fromDate = newTrip.fromDate),
      (trip.toDate = newTrip.toDate),
      (trip.places = newTrip.places);
    await trip.save();

    res.status(200).send({
      message: "trip updated successfully",
      success: true,
      data: trip,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};
