import React from 'react';
import { useNavigate } from "react-router-dom";
import { setUserType } from './utils/utils.js';

const UserTypeBox = (props) => {

    const navigate = useNavigate();

    const register = (event) => {
        // set user type on session
        setUserType(props.userType);
    }

    const toLogin = (event) => {
        event.preventDefault();
        // set user type on session
        setUserType(props.userType);

        // navigate to login
        navigate('/login');
    }

    return (
      <div className="usertype-box">
          <h1 className='h1-marginBtm'>{props.userType} Login</h1>
          <p className="paddedBottom">Some description of what this page will do - bla bla bla bla bla bla</p>
          <button className="paddedBottom" onClick={toLogin}>Login</button>
          <p>Don't have an account?</p>
          <a onClick={register} href="/register">Sign up</a>
      </div>
    );
  };

const Home = () => {

    return (
        <div className="home-container">
            <UserTypeBox userType="Dancer" />
            <UserTypeBox userType="Management"/>
            <UserTypeBox userType="Physio"/>
        </div>

    )
}

export default Home;