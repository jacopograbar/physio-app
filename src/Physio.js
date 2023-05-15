import React, { useState } from "react";
import {
  getBookingsArray,
  getAvailableSlotsArray,
  getUser,
  getArray,
} from "./utils/utils.js";
import { RenderPhysioBlock } from "./Components.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";

const Physio = () => {
  const availability = [
    {
      date: "13/05/2022",
      start: "10:00",
      end: "12:30",
      location: "Sydney Dance Company",
    },
    {
      date: "13/05/2022",
      start: "14:00",
      end: "15:30",
      location: "Sydney Dance Company",
    },
    {
      date: "13/05/2022",
      start: "16:00",
      end: "16:30",
      location: "Sydney Dance Company",
    },
  ];

  const physio = [
    {
      date: "13/05/2022",
      start: "10:00",
      end: "10:30",
      location: "Sydney Dance Company",
    },
    {
      date: "13/05/2022",
      start: "10:30",
      end: "11:00",
      location: "Sydney Dance Company",
    },
    {
      date: "13/05/2022",
      start: "11:00",
      end: "11:30",
      location: "Sydney Dance Company",
    },
    {
      date: "13/05/2022",
      start: "11:30",
      end: "12:00",
      location: "Sydney Dance Company",
    },
    {
      date: "13/05/2022",
      start: "12:00",
      end: "12:30",
      location: "Sydney Dance Company",
    },
  ];

  const availability2 = [
    {
      date: "13/05/2022",
      start: "08:00",
      end: "10:30",
      location: "Sydney Dance Company",
    },
  ];

  const bookingSlots = [
    {
      date: "13/05/2022",
      start: "11:30",
      end: "12:00",
      patient: "Ryan Borges",
      location: "Sydney Dance Company",
    },
    {
      date: "13/05/2022",
      start: "12:00",
      end: "12:30",
      patient: "Jacopo Grabar",
      location: "Sydney Dance Company",
    },
  ];

  const currentUser = getUser();
  // change date to state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentAvailability, setCurrentAvailability] = useState(availability);
  const [physioSlots, setPhysioSlots] = useState(physio);
  const [bookings, setBookings] = useState(bookingSlots);

  // retrieve availability and physio schedule from cloud
  // if no availability, display no availability for today
  const availabilitySlot = getAvailableSlotsArray(currentAvailability, 30);
  const bookingsArray = getBookingsArray(bookings);
  const physioSlotsArray = getArray(physioSlots);
  // TO-DO   const bookings = getBookings(date)
  var location = "-";

  if (currentAvailability.length !== 0) {
    location = currentAvailability[0].location;
  }

  const nextDay = async (event) => {
    event.preventDefault();
    var date = new Date();
    date.setDate(currentDate.getDate() + 1);
    setCurrentDate(date);
    setCurrentAvailability(availability2);
  };

  const previousDay = async (event) => {
    event.preventDefault();
    var date = new Date();
    date.setDate(currentDate.getDate() - 1);
    setCurrentDate(date);
    setCurrentAvailability(availability);
  };

  return (
    <div id="physio-page">
      <div className="userpage-header">
        <div className="profile-pic">
          <img src="../pic1.png" alt="profile pic" />
        </div>
        <h2>{currentUser.username}'s Physio Dashboard</h2>
      </div>
      <div className="userpage-options management-clr">
        <h2>Options</h2>
        <a href="/">Change date</a>
        <a href="/"><b>Log out</b></a>
      </div>
      <div className="userpage-wall">
        <h1>Physio Schedule and Company Availability</h1>
        <div className="arrow-header">
          <FontAwesomeIcon icon={faCaretLeft} onClick={previousDay} />
          <span>{currentDate.toLocaleDateString()}</span>
          <FontAwesomeIcon icon={faCaretRight} onClick={nextDay} />
        </div>
        {currentAvailability.length !== 0 && (
          <div className="schedule-container">
            {availabilitySlot.map((slot, index) => (
              <RenderPhysioBlock
                slot={slot}
                bookings={bookingsArray}
                physioSlots={physioSlotsArray}
                location={location}
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
