import React from 'react';
import { getUser } from './utils/utils.js';


const Physio = () => {

    const currentUser = getUser();
    
    return (
        <div id="physio-page">
           <div className="userpage-header">
            <div className="profile-pic">
                <img src="../pic1.png" alt="profile pic"/>
            </div>
            <h2>{currentUser.company} Management Dashboard</h2>
            </div>
           <div className="userpage-options management-clr">
            <h2>Options</h2>
            <a href="/">Link</a>
            <a href="/">Link</a>
            <a href="/">Link</a>
           </div>
           <div className="userpage-wall">
            <h1>Calendar</h1>
           </div>
        </div>

    )
}

export default Physio;