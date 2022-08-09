import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import "../components/css/login.css";
import { customAlphabet } from "nanoid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { isLength, isMatch } from "./validation/validation";
const nanoid = customAlphabet("1234567890", 3);

export default function Register() {
  const auth = useSelector((state) => state.auth);
  const { LoggedUser } = auth;
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [token, setToken] = useState();
  const [localUser, setLocalUser] = useState(
    JSON.parse(localStorage.getItem("LocalUser"))
  );

  const redirect = () => {
    if (!localUser.status) {
      console.log("21 ", localUser.status);
      navigate("/");
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setUser((values) => ({
      ...values,
      [name]: value,
      id: nanoid(),
      email: localUser.email,
      status: false,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("user", user);

    console.log("token", token);

    const handleLogout = async () => {
      try {
        await axios.get("/user/logout", { headers: { Authorization: token } });

        localStorage.removeItem("Login");
        window.location.href = "/login";
      } catch (err) {
        alert(err);
        window.location.href = "/";
      }
    };

    if (isLength(user.password)) {
      alert("Password must be at least 8 characters long");
      return;
    }

    if (!isMatch(user.password, user.cPassword)) {
      alert("Password and Confirm Password must match");
      return;
    }

    try {
      await axios.post("user/register", user).then((res) => {
        alert(res.data.msg);
      });

      await axios
        .post("user/reset", user, { headers: { Authorization: token } })
        .then((res) => {
          alert(res.data.msg);
          handleLogout();
        });
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  useEffect(() => {
    setToken(localStorage.getItem("TOKEN"));

    //console.log("82", JSON.parse(localStorage.getItem("LocalUser")));

    redirect();
  }, []);
  return (
    <div>
      <div className="login-box">
        <img
          src="https://res.cloudinary.com/waste123/image/upload/v1656828180/RMTS/SE/dhq4bo7yviqktcedd4uo.jpg"
          className="avatar"
        />
        <h1>Register Here</h1>
        <form onSubmit={handleSubmit}>
          <p>First Name</p>
          <input
            type="text"
            name="firstName"
            placeholder="Enter Firstname"
            value={localUser.firstName}
            style={{ cursor: "not-allowed" }}
            disabled
          />
          <p>Last Name</p>
          <input
            type="text"
            name="lastFisrt"
            placeholder="Enter Lastname"
            value={localUser.lastName}
            style={{ cursor: "not-allowed" }}
            disabled
          />
          <p>Email</p>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={localUser.email}
            style={{ cursor: "not-allowed" }}
            disabled
          />
          <p>Date Of Birth</p>
          <input
            type="date"
            name="dateOfBirth"
            onChange={handleChange}
            required
          />
          <p>Password</p>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            required
          />
          <p>Confirm Password</p>
          <input
            type="password"
            name="cPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
          />

          <p>Phone No</p>
          <input
            type="tel"
            name="telephone"
            placeholder="Mobile Number"
            onChange={handleChange}
          />

          <button className="btnSubmit" type="submit" name="submit">
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
}
