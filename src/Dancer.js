import React, { useEffect, useState } from "react";
import { Appointment } from "./Components.js";
import { getUser } from "./utils/utils.js";
import { getBookings } from "./utils/appointmentsManager.js";

const Dancer = () => {

  const currentUser = getUser();
  const company = currentUser.company;
  const username = currentUser.username;
  const [update, setUpdate] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    async function fetchBookings (){
      setUpdate(false);
      setLoading(true);
      const data = await getBookings(company, username);
      setBookings(data);
      setLoading(false);
    }
    fetchBookings();
  }, [company, username, update]);


  function logOut() {
    sessionStorage.clear();
  }

  return (
    <div id="dancer-page">
      <div className="userpage-header">
        <div className="profile-pic">
          <img src={currentUser.img_url} alt="profile pic" />
        </div>
        <h2>{currentUser.username}'s Dashboard</h2>
      </div>
      <div className="userpage-options">
        <h2>Options</h2>
        <a href="/pick-appointment">Book Appointment</a>
        <a href="/dancer">My Bookings</a>
        <a href="/" onClick={logOut}>
          <b>Log Out</b>
        </a>
      </div>
      <div className="userpage-wall">
        <h1>My Bookings</h1>
        {loading && <h2>Loading...</h2>}
        {!loading && bookings.length === 0 && <h2>You currently have no bookings.</h2>}
        {!loading && bookings.length !== 0 && bookings.map((slot, index) => (
          <Appointment
            key={index}
            date={slot.date}
            time={slot.time}
            endTime={slot.endTime}
            location={slot.location}
            physio={slot.physio}
            company={slot.company}
            patient={currentUser.username}
            setUpdate={setUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default Dancer;
