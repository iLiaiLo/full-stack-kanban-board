import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    verify_otp: {
      type: String,
      default: "",
    },
    verify_otp_expire_at: {
      type: Number,
      default: 0,
    },
    is_account_verified: {
      type: Boolean,
      default: false,
    },
    reset_otp: {
      type: String,
      default: "",
    },
    reset_otp_expire_at: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Users = mongoose.model("Users", authSchema);

export default Users;
