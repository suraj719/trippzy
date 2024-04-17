import mongoose from "mongoose";

const BookingSchema = mongoose.Schema(
  {
    bookedBy: mongoose.Schema.Types.Mixed,
    slot: mongoose.Schema.Types.Mixed,
    bookedAt: String,
    bookedTo: String,
    paymentStatus: Boolean,
  },
  { timestamps: true }
);

const Booking = mongoose.model("bookings", BookingSchema);
export default Booking;
