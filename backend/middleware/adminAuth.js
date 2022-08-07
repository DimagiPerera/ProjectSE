import User from "../models/User.js";

const adminAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    console.log("user", user);
    if (user.accountType != "admin")
      return res.status(500).json({ msg: "Denied access to the Admin Resources" });

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
};
export default adminAuth;