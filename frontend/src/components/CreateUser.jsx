import React, { useState } from "react";
import "../components/CSS/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setUser((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("user", user);

    try {
      const response = await axios.post("user/createUser", user).then(() => {
        alert("User Created Successfully");
        navigate("/");
      });

      navigate("/");
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
        <h1>Create User</h1>
        <form onSubmit={handleSubmit}>
          <p>First Name</p>
          <input
            type="text"
            name="firstName"
            placeholder="Enter Firstname"
            onChange={handleChange}
            required
          />
          <p>Last Name</p>
          <input
            type="text"
            name="lastName"
            placeholder="Enter Lastname"
            onChange={handleChange}
            required
          />
          <p>Email</p>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            required
          />
          <p>User Type</p>
          <div className="dropdown">
            <select
              class="form-control"
              id="exampleFormControlSelect1"
              name="accountType"
              onChange={handleChange}
              required
            >
              <option>Select Type</option>
              <option value="admin">Admin</option>
              <option value="student">Student</option>
            </select>
          </div>

          <div>
            <button
              className="btnSubmit mt-3"
              style={{ marginTop: "15px" }}
              type="submit"
              name="submit"
            >
              CREATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
