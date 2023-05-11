import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getUserType } from './utils/utils';

const Register = () => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    var background = "#122932";

    // set background color and destination page depending on the user type
    const userType = getUserType();
      
    if (userType === "Dancer"){
        background = "#576066";
    } else if(userType === "Management"){
        background = "#2C514C";
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log("working");
    
        // make all fields required
        if (
          username.trim() === "" ||
          email.trim() === "" ||
          password.trim() === ""
        ) {
          setMessage("All fields required");
          return;
        }
        // reset error message
        setMessage(null);

        navigate('/');
    
        // check if user is already registered using this email.
        
        // if it doesn't, create new profile

      };

    return (
        <div id="register-page" style={{background : background}}>
            <form className="registration-form" onSubmit={submitHandler}>
                <h1>Register as {userType}</h1>
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
                {/* if the message is defined, show it */}
                {message && <p className="error-message">{message}</p>}
                <input id="register-btn" className="input-btn" type="submit" value="Register" />
            </form>

        </div>

    )
}

export default Register;