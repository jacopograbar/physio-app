import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

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
        <div id="register-page">
            <form className="registration-form" onSubmit={submitHandler}>
                <h1>Register</h1>
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