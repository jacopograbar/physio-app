import React, { useState } from 'react';
import { Appointment } from './Components.js';
import { getUser } from './utils/utils.js';

const Dancer = () => {

    const bookingSlots = [
        {
          date: "13/05/2022",
          start: "11:30",
          end: "12:00",
          patient: "Ryan Borges",
          location: "Sydney Dance Company",
          physio: "Ashely Cohen"
        },
        {
          date: "13/05/2022",
          start: "12:00",
          end: "12:30",
          patient: "Jacopo Grabar",
          location: "Sydney Dance Company",
          physio: "Ashely Cohen"
        }
      ];

    const currentUser = getUser();
    const [bookings, setBookings] = useState(bookingSlots);
    
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
            <a href="/pick-appointment">Book Appointment</a>
            <a href="/dancer">My Bookings</a>
            <a href="/"><b>Log Out</b></a>
           </div>
           <div className="userpage-wall">
            <h1>My Bookings</h1>
            {bookings.map((slot, index) => (
              <Appointment
                key={index}
                date={slot.date}
                time={slot.start}
                location={slot.location}
                physio={slot.physio}
              />
            ))}
           </div>
        </div>

    )
}

export default Dancer;