import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

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

        // check user tipe and set variable
        const userType = "dancer";

        // TODO - should really navigate to profile page
        if (userType === "dancer"){
            navigate('/dancer-page');
        } else if(userType === "manager"){
            navigate('/management-page');
        } else {
            navigate('/physio-page');
        }

    
        // check if the entered details match any on record
        
        // if they do, login and redirect to user profile page

      };

    return (
        <div id="login-page">
            <form className="registration-form" onSubmit={submitHandler}>
                <h1>Login</h1>
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