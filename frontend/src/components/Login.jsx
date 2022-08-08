import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { dispatchLogin } from "../redux/actions/authAction";
import { useDispatch } from "react-redux";
import "../components/CSS/login.css";

export default function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("user", user);

    try {
      const response = await axios.post("user/login", user);
      alert(response.data.msg);
      localStorage.setItem("Login", true);
      console.log("response", response.data.data);
      localStorage.setItem("LocalUser", JSON.stringify(response.data.data));
      navigate("/reg");

      dispatch(dispatchLogin());
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  return (
    <div>
      <div className="login-box" style={{ marginTop: "10PX" }}>
        <img
          src="https://res.cloudinary.com/waste123/image/upload/v1656828180/RMTS/SE/dhq4bo7yviqktcedd4uo.jpg"
          className="avatar"
        />
        <h1>Login Here</h1>
        <form onSubmit={handleSubmit}>
          <p>Email</p>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
          />
          <p>Password</p>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
          />
          <button className="btnSubmit" type="submit" name="submit">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}
