import React from 'react';
import { Appointment } from './Components.js';
import { getUser } from './utils/utils.js';


const Dancer = () => {

    const currentUser = getUser();
    
    return (
        <div id="dancer-page">
           <div className="userpage-header">
            <div className="profile-pic">
                <img src="../pic1.png" alt="profile pic"/>
            </div>
            <h2>{currentUser.username}'s Dashboard</h2>
            </div>
           <div className="userpage-options">
            <h2>Options</h2>
            <a href="/">Link</a>
            <a href="/">Link</a>
            <a href="/">Link</a>
           </div>
           <div className="userpage-wall">
            <h1>My Appointments</h1>
            <Appointment date="28/05/2023" time="10.15 AM" physio="Ashley Cohen"/>
            <Appointment date="03/07/2023" time="10.45 AM" physio="Ashley Cohen"/>
           </div>
        </div>

    )
}

export default Dancer;