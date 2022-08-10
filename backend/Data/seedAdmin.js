import Admin from "../models/user.js";
import bcrypt from "bcrypt";

const temPasswordHash = await bcrypt.hash("saranga@123", 12);

const Admins = {
  firstName: "Piumika",
  lastName: "Saranga",
  email: "piumika1999@gmail.com",
  accountType: "admin",
  password: temPasswordHash,
};

const seedAdmin = async () => {
  try {
    await Admin.findOneAndDelete({ email: Admins.email });
    await Admin.create(Admins);
    console.log("Admin Created...");
  } catch (err) {
    console.log("Admin Creation Failed...", err.message);
  }
};

export default seedAdmin;
