import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getUserType, setUserSession } from './utils/utils.js';

const Login = ({setIsLoggedIn}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    var background = "#122932";
    var destinationPage = "";

    // set background color and destination page depending on the user type
    const userType = getUserType();
      
    if (userType === "Dancer"){
        background = "#576066";
        destinationPage = "/dancer";
    } else if(userType === "Management"){
        background = "#2C514C";
        destinationPage = "/management";
    } else {
        destinationPage = "/physio";
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log("working");
    
        // make all fields required
        if (
          email.trim() === "" ||
          password.trim() === ""
        ) {
          setMessage("All fields required");
          return;
        }
        // reset error message
        setMessage(null);

        // set user in session variable
        setUserSession({username:"Mary", email:"maryj@xxx.com", company:"Sydney Dance Company"});

        setIsLoggedIn(true);
        navigate(destinationPage);
      };


    return (
        <div id="login-page" style={{background : background}}>
            <form className="registration-form" onSubmit={submitHandler}>
                <h1>{userType} Login</h1>
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
                <input id="register-btn" className="input-btn" type="submit" value="Login" />
            </form>

        </div>

    )
}

export default Login;