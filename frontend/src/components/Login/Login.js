import { useHistory } from "react-router-dom";
import InputField from "../Password";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import React, { useState } from "react";
import loginStyle from './loginstyle';
import axios from "axios";


//initializing form input states

const initialState = { _id: "", email: "", password: "", login: '' };

const SignIn = () => {

  const classes = loginStyle();
  let history = useHistory();

 //states
  const [showPassword, setShowpassword] = useState(false);
  const [isSignUp, setSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState(initialState);
  const [isfailedLogin, setfailedLogin] = useState(false);

//password visibility
  const handleShowPass = () => setShowpassword((prevShowPass) => !prevShowPass);

//submit form details
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.post(`localhost:8070/login/signin`, formData).then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userData", JSON.stringify(res.data.user));
        console.log(res.data.user);
        setfailedLogin(false)
        let user = res.data.user;
        if (!user.status) {
          window.location.replace("/resetuser");
        } else {
          if (user.accountType == 'admin') {
            window.location.replace("/home");
          } else {
            window.location.replace("/note");
          }
        }
      });
      console.log(formData);
    } catch (error) {
      console.log(error);
      setfailedLogin(true)
    }
  };

  const onchange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const validEmail = RegExp(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/);
    switch (name) {
      case "email":
        errors.email =
          value.length <= 0 ? "Email Can not be empty! Ex:- Example@gmail.com" : "";
        if (validEmail.test(value)) {
          errors.eid = "Enter valid Email! Ex:- Example@gmail.com";
        }
        break;
      case "password":
        errors.password = value.length <= 0 ? "Password can not be empty!" : "";

        break;
      default:
        break;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" className="container" maxWidth="md">
      <Paper className={classes.paper} maxWidth="mdx" elevation={3}>
        <div>
          <Avatar className={classes.avatar}>
            <LocalLibraryIcon />
          </Avatar>
          <Typography variant="h5">Sign In</Typography>
        </div>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <InputField
              name="email"
              label="Email"
              handleOnchange={onchange}
              type="text"
            />
            {errors.email.length > 0 && (
              <span className="error">{errors.email}</span>
            )}

            <InputField
              name="password"
              label="Password"
              handleOnchange={onchange}
              type={showPassword ? "text" : "password"}
              handleShowPass={handleShowPass}
            />
            {errors.email.length > 0 && (
              <span className="error">{errors.password}</span>
            )}
          </Grid>

          <Button
            className={classes.submit}
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          {isfailedLogin && (
            <span className="error">Invalid Credentials</span>
          )}
          <hr />
        </form>
      </Paper>
    </Container>
  );
};

export default SignIn;