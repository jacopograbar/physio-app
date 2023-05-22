import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserType } from "./utils/utils.js";
import axios from "axios";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const region = "us-east-1";
const creds = {
  secretAccessKey: "dMmg+s9FCXLb67Q+d1X/bqSMRaHMVY57IxBeLpdY",
  accessKeyId: "ASIA6IEYYI74QOOUDT4N",
  sessionToken:
    "FwoGZXIvYXdzEKX//////////wEaDFOw0hMQjcal17g4KCLNAZi6K9OA/xgaOmXXJtdzz5SknLUZW6Uw97tOI2LGf6r5tcF/ZKfNILv8TspS7zfGQal3zCK5jtddrHst2yLwBmZCRV5a2gy+af5U++f1JrmzoBeC2c2I4ItxDNF1ltsyA+Z5C0NgRuGRQPoLeY6dE5tuKH48lVaoqUw2ZPK0C7IKnlyYSvWAFNt16BmHrepj/tbDXHpFiCaLum9C102G2aoTDOU2dMCQUyjG4RN71kdvs/a6Xe2bs6NI8kOkHdHzG1TY2dGNZCuWiURovMooipmtowYyLe5VGa2+Q+x7enfDSBvoOflPZG66AIUNOomNByYUcDbBnVHryfcWtJmH5O9LSA==",
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
