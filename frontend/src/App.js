import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  dispatchLogin,
  fetchUser,
  dispatchGetUser,
} from "./redux/actions/authAction";
import CreateNote from "./components/CreateNote";
import CreateUser from "./components/CreateUser";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import NoteList from "./components/NoteList";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const login = localStorage.getItem("Login");
    if (login) {
      const getToken = async () => {
        const res = await axios.post("/user/refresh_token", null);
        localStorage.setItem("TOKEN", res.data.access_token);
        dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
      };
      getToken();
    }
  }, [auth.isLogged, dispatch]);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());

        return fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
    }
  }, [token, dispatch]);

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/reg" element={<Register />} exact />
          <Route
            path="/create"
            element={auth.isLogged && auth.isAdmin ? <CreateUser /> : <Login />}
            exact
          />
          <Route
            path="/notes"
            element={auth.isLogged ? <CreateNote /> : <Login />}
            exact
          />
          <Route
            path="/list"
            element={auth.isLogged ? <NoteList /> : <Login />}
            exact
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
