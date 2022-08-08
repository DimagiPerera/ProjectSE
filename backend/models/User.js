import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    id: {
      type: Number,
      default: 0,
    },
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      default: "",
    },
    mobile: {
      type: Number,
      default: 0,
    },
    status: {
      type: Boolean,
      default: true,
    },
    password: {
      type: String,
    },
    accountType: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
