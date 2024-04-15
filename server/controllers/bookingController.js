import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(200).send({
      message: "bookingF saved successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "something went wrong !",
      success: false,
    });
  }
};
