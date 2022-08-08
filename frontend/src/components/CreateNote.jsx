import React, { useState, useEffect } from "react";
import "../components/CSS/note.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';

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
        swal({
          text: "Note Created Successfully",
          icon: "success",
        });
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
          <img src="https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80" />
        </div>
        <div className="user-form">
          <h2>My Notes</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter the Title Here"
              name="title"
              onChange={handleChange}
            />

            <textarea style={{width:500,height:200,borderRadius:20}}
              type="text-area"
              name="note"
              onChange={handleChange}
            />

            <div className="action-btn " style={{ marginLeft: "70px" }}>
              <button className="btnCreate primary">Add Note</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
