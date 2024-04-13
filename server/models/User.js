import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);
export default User;
