import React from "react";
import { useNavigate } from "react-router-dom";
import { setUserType } from "./utils/utils.js";

const UserTypeBox = (props) => {
  const navigate = useNavigate();

  const register = (event) => {
    // set user type on session
    setUserType(props.userType);
  };

  const toLogin = (event) => {
    event.preventDefault();
    // set user type on session
    setUserType(props.userType);

    // navigate to login
    navigate("/login");
  };

  return (
    <div className="usertype-box">
      <h1 className="h1-marginBtm">{props.userType} Login</h1>
      {props.userType === "Dancer" && (
        <p className="paddedBottom">
          If you are a dancer, access your account here. You will be able to
          view and manage current bookings, and book new physio sessions.
        </p>
      )}
      {props.userType === "Management" && (
        <p className="paddedBottom">
          If you are a company manager, access your account here. You will be able to
          view and set the company's availability.
        </p>
      )}
      {props.userType === "Physio" && (
        <p className="paddedBottom">
          If you are a physiotherapist, access your account here. You will be able to
          manage current bookings, availability and physio slots.
        </p>
      )}
      <button className="paddedBottom" onClick={toLogin}>
        Login
      </button>
      <p>Don't have an account?</p>
      <a onClick={register} href="/register">
        Sign up
      </a>
    </div>
  );
};

const Home = () => {
  return (
    <div className="home-container">
      <UserTypeBox userType="Dancer" />
      <UserTypeBox userType="Management" />
      <UserTypeBox userType="Physio" />
    </div>
  );
};

export default Home;
