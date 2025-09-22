import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    phonenumber: {
      type: String,
      required: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
