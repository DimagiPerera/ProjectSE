import User from "../models/user.js";
import { nanoid } from "nanoid";
import sendMail from "./sendMail.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


//create user
export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, accountType } = req.body;
    console.log(req.body);

    //Generate temporary password
    const temPassword = nanoid(8);

    if (!firstName || !lastName || !email || !accountType) {
      return res.status(400).json({
        msg: "Please fill all the fields",
      });
    }

    //Check email validation
    if (!validateEmail(email)) {
      return res.status(400).json({
        msg: "Please enter valid email",
      });
    }

    //Check if email already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        msg: "User already exists",
      });
    }

    //Encrypt password
    const temPasswordHash = await bcrypt.hash(temPassword, 12);

    //Create new user
    await User.create({
      firstName,
      lastName,
      email,
      accountType,
      password: temPasswordHash,
    }).then((data) => {
      res.status(200).json(data);

      const url = `${process.env.CLIENT_URL}/login`;

      //Send email to the user
      sendMail(firstName, temPassword, email, url);
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

//Sign In
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        msg: "Please fill all the fields",
      });
    }

    //Check if email already exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "User does not exist",
      });
    }
    //Check if password matched
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        msg: "Password is incorrect",
      });
    }

    //Refresh token
    const refresh_token = createRefreshToken({ id: user._id });

    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/user/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      msg: "Login Success",
      data: user,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

//Reset password
export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Password Validation
    if (password.length < 8) {
      return res.status(400).json({
        msg: "Password must be at least 8 characters long",
      });
    }


    //Hash password
    const passwordHash = await bcrypt.hash(password, 12);
    //Update password
    await User.findOneAndUpdate({ email }, { password: passwordHash }).then(
      () => {
        res.status(200).json({
          msg: "Password reset successfully",
        });
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};


//Sign Up
export const registerUser = async (req, res) => {
  try {
    const { id, firstName, lastName, email, dateOfBirth, mobile, status } =
      req.body;
    console.log(req.body);

    await User.findOneAndUpdate(
      { email: email },
      {
        id: id,
        dateOfBirth: dateOfBirth,
        mobile: mobile,
        status: status,
      }
    )
      .then(() => {
        return res.status(200).json({
          msg: "register Success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

//Fetch all users details
export const getAllUsersInfo = async (req, res) => {
  try {
    console.log("getAllUsersInfo", req.user);
    await User.find()
      .select("-password") //exception for password
      .then((data) => {
        res.status(200).json(data);
      });
  } catch (err) {
    res.status(400).json(err);
  }
};

//Fetch single user information
export const getUserInfo = async (req, res) => {
  console.log("getUserInfo", req.user);
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

//Logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
    return res.json({ msg: "Logged out." });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

//Email Valiation
function validateEmail(email) {
  const regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(email);
}

//Create refresh token
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

//Get access token
export const getAccessToken = (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token) return res.status(400).json({ msg: "Please login now!" });

    jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "Please login now!" });

      const access_token = createAccessToken({ id: user.id });
      console.log(user);
      res.json({ access_token });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
};

//Create access token
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};
