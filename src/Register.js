import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserType } from "./utils/utils.js";
import axios from "axios";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const region = "us-east-1";
const creds = {
  secretAccessKey: "7a+Jn4lIQXyv8rCZx1FSXlxUAH3pvOYgW+fP2abK",
  accessKeyId: "ASIA6IEYYI74UMNFIZ6Y",
  sessionToken:
    "FwoGZXIvYXdzEKL//////////wEaDEkY7dhpv/qbVoEVYyLNASifQQhQKPoxWI9u6nKbpEOiyeVVp8bwrNJyOArZWaE2FxqSJG2yVcnqp2vYD7H28fwa3Wi7EovMot+Q41JWZqgwvAVs48u26O4xIYb5N7SzoaKSVL5b1URDv6An65wKBRm1P3AL3hP+RHMuy9JEWB8L5RA9JM+fVv4VTTNP1DEP1ZBWioshZf/GO9DQ78sPdSXuLGLO+JEJNN+RgJstVhHR7Jek+b5OJGvdzFbJOjrdwCYjraGzlSSoDBgaQjy8s9gfUQJtDpCw6+1TC28ooMWsowYyLauzb7wfuI+rQ5KKruk2EacxOhfQZA+kKhFw1xC7O44aE5lyz9GEfuWOrJHhow==",
};

const s3client = new S3Client({
  region: region,
  credentials: creds,
});

const registerURL =
  "https://12pwbl14l1.execute-api.us-east-1.amazonaws.com/prod/register";


const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("Sydney Dance Company");
  const [imgBlob, setImgBlob] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  var background = "#122932";

  // set background color and destination page depending on the user type
  const userType = getUserType();

  if (userType === "Dancer") {
    background = "#576066";
  } else if (userType === "Management") {
    background = "#2C514C";
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    const requestConfig = {
      headers: {
        "x-api-key": "c2WkiIoZLc67GbReWwKPP1tbZIQglNMu88ifIUQX",
      },
    };

    const requestBody = {
      email: email,
      type: userType,
      username: username,
      company: company,
      password: password,
    };

    const filename = username.replace(/\s/g, "") + ".jpg";
  
    const input = {
      Body: imgBlob,
      Bucket: "s3876518-a2",
      Key: filename,
    };
    const command = new PutObjectCommand(input);
    const response = await s3client.send(command);
    console.log(response);

    axios
      .post(registerURL, requestBody, requestConfig)
      .then((response) => {
        setMessage("Registration Succesful");
        navigate("/");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setMessage(error.response.data.message);
        } else {
          setMessage(
            "Sorry, the backend server is down! Please try again later."
          );
        }
      });
  };

  return (
    <div id="register-page" style={{ background: background }}>
      <form className="registration-form" onSubmit={submitHandler}>
        <h1>Register as {userType}</h1>
        <input type="hidden" id="type" value={userType} />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />
        <label htmlFor="profile-pic">Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          id="profile-pic"
          onChange={(event) => setImgBlob(event.target.files[0])}
        />
        {/* if the message is defined, show it */}
        {message && <p className="error-message">{message}</p>}
        <input
          id="register-btn"
          className="input-btn"
          type="submit"
          value="Register"
        />
      </form>
    </div>
  );
};

export default Register;
