import mongoose from "mongoose";
import adminSeed from "./data/adminSeed.js";

//Database connection
const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Connected to the Database");
      adminSeed();
    })
    .catch((err) => {
      console.log("Failed to connect to the Database", err.message);
      process.exit();
    });
};
export default connectDB;
