import React, { useState, useEffect } from "react";
import "../components/CSS/note.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateNote() {
  const [note, setNote] = useState([]);
  const [localUser, setLocalUser] = useState(
    JSON.parse(localStorage.getItem("LocalUser"))
  );
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNote((values) => ({ ...values, [name]: value, email: localUser.email }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("note", note);

    try {
      const response = await axios.post("notes/createNote", note).then(() => {
        alert("Note Created Successfully");
        navigate("/");
      });

      navigate("/list");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <div>
      <div className="inner mt-4">
        <div className="photo">
          <img src="https://res.cloudinary.com/waste123/image/upload/v1656833398/RMTS/SE/ngvm9vq9whtyg9wbwjhc.png" />
        </div>
        <div className="user-form">
          <h2>My Notes</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              name="title"
              onChange={handleChange}
            />

            <textarea
              type="text-area"
              placeholder="Description"
              name="note"
              onChange={handleChange}
            />

            <div className="action-btn " style={{ marginLeft: "70px" }}>
              <button className="btnCreate primary">Create Note</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
