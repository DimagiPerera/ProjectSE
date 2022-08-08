import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";

function Header() {
  const auth = useSelector((state) => state.auth);
  const { LoggedUser, isLogged, isAdmin } = auth;
  const [token, setToken] = useState();
  const [localUser, setLocalUser] = useState(LoggedUser);
  useEffect(() => {
    setToken(localStorage.getItem("TOKEN"));
    localStorage.setItem("LocalUser", localUser);
    //localStorage.setItem("LocalUser", JSON.stringify(LoggedUser));
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("/user/logout", { headers: { Authorization: token } });
      localStorage.removeItem("Login");
      window.location.href = "/";
    } catch (err) {
      alert(err);
      window.location.href = "/";
    }
  };

  const studentLink = () => {
    return (
      <ul className="nav-area">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/notes">Add Note</Link>
        </li>
        <li>
          <Link to="/list">My Notes</Link>
        </li>

        <li>
          <Link to="#" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>
    );
  };

  const adminLink = () => {
    return (
      <ul className="nav-area">
        <li style={{ marginRight: "700px", color: "white" }}>
          <label>Hi {LoggedUser.firstName}</label>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/create">Create User</Link>
        </li>
        <li>
          <Link to="#">All Users</Link>
        </li>

        <li>
          <Link to="/login" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>
    );
  };

  return (
    <header>
      <ul className="nav-area">
        {isLogged ? (
          isAdmin ? (
            adminLink()
          ) : (
            studentLink()
          )
        ) : (
          <li>
            <Link to="/login">Sign in</Link>
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;
