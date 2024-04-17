import mongoose from "mongoose";

const tripSchema = mongoose.Schema(
  {
    user: mongoose.Schema.Types.Mixed,
    title: String,
    fromDate: Date,
    toDate: Date,
    places: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

const Trip = mongoose.model("trips", tripSchema);
export default Trip;
