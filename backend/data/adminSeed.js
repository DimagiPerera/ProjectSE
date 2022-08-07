import Admin from "../models/User.js";
import bcrypt from "bcrypt";

const temPasswordHash = await bcrypt.hash("saranga@123", 12);

const Admins = {
  firstName: "Piumika",
  lastName: "Saranga",
  email: "piumikasaranga@gmail.com",
  mobile: "0786787656",
  dateOfBirth: "04/03/1999",
  accountType: "admin",
  password: temPasswordHash,
};

const adminSeed = async () => {
  try {
    await Admin.findOneAndDelete({ email: Admins.email });
    await Admin.create(Admins);
    console.log("Successfully created the Admin");
  } catch (err) {
    console.log("Failed to create the Admin", err.message);
  }
};

export default adminSeed;
