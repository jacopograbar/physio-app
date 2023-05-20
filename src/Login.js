import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserType, setUserSession, retrieveImgFromS3 } from "./utils/utils.js";
import axios from "axios";

const loginURL =
  "https://12pwbl14l1.execute-api.us-east-1.amazonaws.com/prod/login";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  var background = "#122932";
  var destinationPage = "";

  // set background color and destination page depending on the user type
  const userType = getUserType();

  if (userType === "Dancer") {
    background = "#576066";
    destinationPage = "/dancer";
  } else if (userType === "Management") {
    background = "#2C514C";
    destinationPage = "/management";
  } else {
    destinationPage = "/physio";
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log("working");

    const requestConfig = {
      headers: {
        "x-api-key": "c2WkiIoZLc67GbReWwKPP1tbZIQglNMu88ifIUQX",
      },
    };

    const requestBody = {
      email: email,
      type: userType,
      password: password,
    };

    axios
      .post(loginURL, requestBody, requestConfig)
      .then((response) => {
        setMessage("Login Succesful");
        setUserSession({
          username: response.data.username,
          email: response.data.email,
          company: response.data.company,
          type: response.data.type,
          img_url: retrieveImgFromS3(response.data.username)
        });
        setIsLoggedIn(true);
        navigate(destinationPage);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };

  return (
    <div id="login-page" style={{ background: background }}>
      <form className="registration-form" onSubmit={submitHandler}>
        <h1>{userType} Login</h1>
        <input type="hidden" id="type" value={userType} />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {/* if the message is defined, show it */}
        {message && <p className="error-message">{message}</p>}
        <input
          id="register-btn"
          className="input-btn"
          type="submit"
          value="Login"
        />
      </form>
    </div>
  );
};

export default Login;
