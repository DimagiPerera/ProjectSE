const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const checkAuth = require("./middleware/auth");
const UserRoute = require("./controllers/usercontroller");
const LoginRoute = require("./controllers/logincontroller");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 8070;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(
  MONGODB_URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (error) => {
    if (error) {
      console.log("DataBase ERROR: ", error.message);
    }
  }
);

mongoose.connection.once("open", () => {
  console.log("Database Connected Successfully");
});

app.use("/login", LoginRoute);
app.use(checkAuth);
app.use("/user", UserRoute);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });