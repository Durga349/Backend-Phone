import mongoose from "mongoose";

const verifySchema = new mongoose.Schema(
  {
    phonenumber: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
    },
    expiryAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Verification", verifySchema);
