import React, { useState, useEffect } from "react";
import { getBookingsArray, getUser, getArray } from "./utils/utils.js";
import { RenderPhysioBlock } from "./Components.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faCaretLeft
} from "@fortawesome/free-solid-svg-icons";
import {
  getAvailabilitySlots,
  getBookingsByDate,
  getPhysioSlots,
} from "./utils/appointmentsManager.js";

const Physio = () => {
  const currentUser = getUser();
  // change date to state
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentAvailability, setCurrentAvailability] = useState([]);
  const [physioSlots, setPhysioSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [physio, setPhysio] = useState("");

  useEffect(() => {
    async function fetchAvailability() {
      setLoading(true);
      const avData = await getAvailabilitySlots(
        currentDate.toLocaleDateString(),
        currentUser.company
      );
      setCurrentAvailability(avData);

      const phData = await getPhysioSlots(
        currentDate.toLocaleDateString(),
        currentUser.company
      );
      setPhysioSlots(phData);

      const bData = await getBookingsByDate(
        currentUser.company,
        currentDate.toLocaleDateString()
      );
      setBookings(bData);
      setLoading(false);
    }
    fetchAvailability();
    if(bookings.length !== 0){
      setPhysio(bookings[0].physio);
    }
    setRefresh(false);
  }, [currentDate, refresh, setCurrentAvailability, setPhysioSlots, setBookings, setPhysio]); // set to currentAvailability when you want to render

  // retrieve availability and physio schedule from cloud
  // if no availability, display no availability for today
  const availabilitySlot = getArray(currentAvailability);
  const bookingsArray = getBookingsArray(bookings);
  const physioSlotsArray = getArray(physioSlots);
  const allSlots = [
    ...availabilitySlot,
    ...physioSlotsArray,
    ...getArray(bookings),
  ].sort();
  console.log(allSlots);

  var location = "-";

  if (currentAvailability.length !== 0) {
    location = currentAvailability[0].location;
  }

  const nextDay = async (event) => {
    event.preventDefault();
    var date = new Date();
    date.setDate(currentDate.getDate() + 1);
    setCurrentDate(date);
  };

  const previousDay = async (event) => {
    event.preventDefault();
    var date = new Date();
    date.setDate(currentDate.getDate() - 1);
    setCurrentDate(date);
  };

  function logOut() {
    sessionStorage.clear();
  }

  return (
    <div id="physio-page">
      <div className="userpage-header">
        <div className="profile-pic">
          <img src={currentUser.img_url}  alt="profile pic" />
        </div>
        <h2>{currentUser.username}'s Physio Dashboard</h2>
      </div>
      <div className="userpage-options management-clr">
        <h2>Options</h2>
        <a href="/" onClick={logOut}>
          <b>Log out</b>
        </a>
      </div>
      <div className="userpage-wall">
        <h1>Physio Schedule and Company Availability</h1>
        <div className="arrow-header">
          <FontAwesomeIcon icon={faCaretLeft} onClick={previousDay} />
          <span>{currentDate.toLocaleDateString()}</span>
          <FontAwesomeIcon icon={faCaretRight} onClick={nextDay} />
        </div>
        {loading && <h2>Loading...</h2>}
        {!loading && currentAvailability.length !== 0 && (
          <div className="schedule-container">
            {allSlots.map((slot, index) => (
              <RenderPhysioBlock
                slot={slot}
                bookings={bookingsArray}
                physioSlots={physioSlotsArray}
                location={location}
                physio={physio}
                company={currentUser.company}
                date={currentDate.toLocaleDateString()}
                setRefresh = {setRefresh}
              />
            ))}
          </div>
        )}
        {currentAvailability.length === 0 && (
          <div>
            <h2 className="h2-marginBtm">
              No availability has yet been set by the company manager for this
              date.
            </h2>
            <h2>You cannot book physio slots.</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Physio;
