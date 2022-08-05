const path = require("path");
const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Router = express.Router();
const Mailer = require('./mailcontroller.js');
const bcrypt = require('bcrypt')

// Add new users

Router.post(
  "/insert",
  async (req, res) => {
    try {
      console.log(req.body);

      const { firstName, lastName, email, dateOfBirth, mobile, status, password, accountType } = req.body;
      let hashpassword = await bcrypt.hash(req.body.password, 12);
      const user = new User({
        firstName,
        lastName,
        email,
        dateOfBirth,
        mobile,
        status,
        password: hashpassword,
        accountType,
      });
      await user.save().then((result) => {
        console.log(result);
        Mailer.newaccount([email, password])
        res.send("The new user has been successfully added to the system");
      }).catch((err) => {
        console.log(err);

      })

    } catch (error) {
      console.log(error);

      res
        .status(400)
        .send("Error while uploading User details. Try again later.");
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

// Fetch all users

Router.get("/getAllUsers", async (req, res) => {

  try {
    const files = await User.find({});

    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );

    res.send(sortedByCreationDate);
  } catch (error) {
    res
      .status(400)
      .send("Error while getting list of users. Try again later.");
  }
});

// Search users member by name

Router.get("/searchStaff/:key", async (req, res) => {
  try {
    let key = req.params.key;
    let query = { name: new RegExp(key, "i") };
    console.log(query);
    User.find(query, (err, result) => {
      if (err) {
        return next(err);
      }

      data = {
        status: "success",
        code: 200,
        data: result,
      };
      res.json(data);
    });
  } catch (error) {
    res
      .status(400)
      .send("Error while getting user member Details. Try again later.");
  }
});

// Fetch one user

Router.get("/getstaffmember/:id", async (req, res) => {
  try {
    let id = req.params._id;
    console.log(id);
    const member = await User.find({ firstName: _id });
    res.send(member);
  } catch (error) {
    res
      .status(400)
      .send("Error while getting list of user members. Try again later.");
  }
});


// Update Users

Router.put("/:id", async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  console.log('----------------ssss');
  let password = await bcrypt.hash(req.body.password, 12);
  try {
    let user = await User.findById(req.params.id);

    const data = {
      firstName: req.body.firstName || user.firstName,
      lastName: req.body.lastName || user.lastName,
      email: req.body.email || user.email,
      dateOfBirth: req.body.dateOfBirth || user.dateOfBirth,
      mobile: req.body.mobile || user.mobile,
      status: req.body.status || user.status,
      password: password || user.password,

    };
    await User.findByIdAndUpdate(req.params.id, data, { new: true }).then((result) => {
      console.log(result);
      res.json(user);
    })

  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message, success: false });
  }
});


Router.delete("/:id", async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);
    
    user.remove((err, result) => {
      if (err) { return next(err) }

      res.json(result);

    })

  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message, success: false });
  }
});


module.exports = Router;