import mongoose from "mongoose";

const slotSchema = mongoose.Schema(
  {
    lat: Number,
    lng: Number,
    price: Number,
    images: {
      type: mongoose.Schema.Types.Mixed,
    },
    description: String,
    uploadedBy: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

const Slot = mongoose.model("slots", slotSchema);
export default Slot;
